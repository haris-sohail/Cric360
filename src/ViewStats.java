import javax.swing.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.sql.*;

public class ViewStats extends JFrame {
    private JPanel panelMain;
    private JTextField textField1;
    private JButton OKButton;
    private JTextArea resultText;

    public JPanel getPanelMain() {
        return panelMain;
    }

    public ViewStats() {
        OKButton.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                // Clear previous results
                //resultText.setText("");

                // Execute the SQL query and display results
                displayPlayerStats();
            }
        });
    }

    // Inside the ViewStats class
    private void displayPlayerStats() {
        // Connect to the database
        try (Connection connection = DriverManager.getConnection(Main.connectionString)) {
            // Execute the SQL query to get player stats
            try (PreparedStatement preparedStatement = connection.prepareStatement(
                    "SELECT u.first_name + ' ' + u.last_name AS FullName, p.playsInTeam as 'Plays In Team', ps.* " +
                            "FROM User$ u " +
                            "INNER JOIN Player p ON u.id = p.user_id " +
                            "LEFT JOIN PlayerStats ps ON u.id = ps.playerID " +
                            "WHERE ps.playerID = ?")) {

                // Set the playerID parameter based on the input
                preparedStatement.setString(1, textField1.getText());

                // Execute the query
                ResultSet resultSet = preparedStatement.executeQuery();

                // Prepare the result text
                StringBuilder resultText = new StringBuilder("<html><body><table border='0.5'>");

                // Display user's full name at the top
                if (resultSet.next()) {
                    resultText.append("<tr>");
                    resultText.append("<td colspan='2' style='font-family: \"Times New Roman\"; font-size: 16px; margin-left: 120px;text-align: center;'><b>")
                            .append(resultSet.getString("FullName")).append("</b></td>");
                    resultText.append("</tr>");

//                    resultText.append("<tr>");
//                    resultText.append("<td colspan='2' style='font-family: \"Droid Serif\";'>Plays In Team: ").append(resultSet.getString("playsInTeam")).append("</td>");
//                    resultText.append("</tr>");
                }

                // Get the result metadata
                ResultSetMetaData metaData = resultSet.getMetaData();
                int columnCount = metaData.getColumnCount();

                // Iterate through columns and append each heading and value to the resultText
                for (int i = 2; i <= columnCount; i++) {
                    String columnName = metaData.getColumnName(i);

                    // Skip the 'playerID' column
                    if (!columnName.equals("playerID") && !columnName.equals("highScore") && !columnName.equals("hundreds") &&!columnName.equals("fifties") &&!columnName.equals("format")) {
                        String columnValue = resultSet.getString(i);

                        columnValue = (columnValue == null) ? "-" : columnValue;

                        // Add a table row
                        resultText.append("<tr>");

                        // Add column headers
                        resultText.append("<td style='font-family: \"Droid Serif\";'><b>").append(columnName).append("</b></td>");

                        // Add column values
                        resultText.append("<td style='font-family: \"Droid Serif\";'>").append(columnValue).append("</td>");

                        // Close the table row
                        resultText.append("</tr>");
                    }
                }

                // Close the table
                resultText.append("</table></body></html>");

                // Display the result frame
                displayResultFrame(resultText.toString());
            }
        } catch (SQLException ex) {
            ex.printStackTrace();
            JOptionPane.showMessageDialog(this, "Error executing the SQL query.");
        }
    }

    private void displayResultFrame(String resultText) {
        JFrame resultFrame = new JFrame("Player Stats");
        resultFrame.setDefaultCloseOperation(JFrame.DISPOSE_ON_CLOSE);
        resultFrame.setSize(400, 465);
        resultFrame.setLocationRelativeTo(this);

        JLabel resultLabel = new JLabel(resultText);
        resultFrame.add(resultLabel);

        resultFrame.setVisible(true);
    }

}
