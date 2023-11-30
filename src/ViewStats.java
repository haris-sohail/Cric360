import javax.swing.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.sql.*;

public class ViewStats extends JFrame {
    private JPanel panelMain;
    private JTextField textField1;
    private JLabel hellotxt;
    private JButton OKButton;

    public JPanel getPanelMain() {
        return panelMain;
    }

    public ViewStats() {
        OKButton.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                String playerName = textField1.getText();
                displayPlayerStats(playerName);
            }
        });
    }

    private void displayPlayerStats(String playerName) {
        try (Connection connection = DriverManager.getConnection(Main.connectionString)) {
            String query = "SELECT Player.user_id AS name, PlayerStats.* FROM PlayerStats " +
                    "INNER JOIN Player ON Player.user_id = PlayerStats.playerID " +
                    "WHERE Player.user_id = ?";
            try (PreparedStatement preparedStatement = connection.prepareStatement(query)) {
                preparedStatement.setString(1, playerName);
                try (ResultSet resultSet = preparedStatement.executeQuery()) {
                    if (resultSet.next()) {
                        ResultSetMetaData metaData = resultSet.getMetaData();
                        int columnCount = metaData.getColumnCount();

                        //StringBuilder resultText = new StringBuilder("<html><div style='text-align: center; font-size: 16px; font-family: \"Droid Serif\";'><b>" + playerName + "</b></div><br>");
                        StringBuilder resultText = new StringBuilder("<html><div style='text-align: center; font-family: Times New Roman; font-size: 16px; margin-left: 120px; text-transform: capitalize;'><b>" + playerName + "</b></div><br>");
                        // Start the table
                        resultText.append("<table style='width:100%; border-collapse: collapse;'>");

                        resultText.append("<tr>");
                        resultText.append("<td colspan='2' style='text-align: center; font-family: Times New Roman; font-size: 16px; color: darkred; text-transform: capitalize;'><b>")
                                .append(resultSet.getString("playerID")).append("</b></td>");
                        resultText.append("</tr>");

                        // Iterate through columns and append each heading and value to the resultText
                        for (int i = 2; i <= columnCount; i++) {
                            String columnName = metaData.getColumnName(i);
                            //String columnValue = resultSet.getString(i);

                            // Skip the 'playerID' column
                            if (!columnName.equals("playerID")) {
                                String columnValue = resultSet.getString(i);

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

                        // End the table
                        resultText.append("</table></html>");

                        // Display the result in a new window
                        displayResultFrame(resultText.toString());
                    } else {
                        JOptionPane.showMessageDialog(this, "Player not found in the database.");
                    }
                }
            }
        } catch (SQLException ex) {
            ex.printStackTrace();
            JOptionPane.showMessageDialog(this, "Error retrieving player data from the database.");
        }
    }



    private void displayResultFrame(String resultText) {
        JFrame resultFrame = new JFrame("Player Stats");
        resultFrame.setDefaultCloseOperation(JFrame.DISPOSE_ON_CLOSE);
        resultFrame.setSize(400, 440);
        resultFrame.setLocationRelativeTo(this);

        JLabel resultLabel = new JLabel(resultText);
        resultFrame.add(resultLabel);

        resultFrame.setVisible(true);
    }
}
