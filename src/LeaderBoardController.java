import javax.swing.*;
import java.awt.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.sql.*;

public class LeaderBoardController extends JFrame {
    private JPanel panelMain;
    private JComboBox<String> comboBox1;
    private JButton OKButton;

    public JPanel getPanelMain() {
        return panelMain;
    }

    public LeaderBoardController() {
        OKButton.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                // Get the selected item from the combo box
                String selectedOption = (String) comboBox1.getSelectedItem();

                // Handle the logic based on the selected option
                displayLeaderBoard(selectedOption);
            }
        });
    }

    private void displayLeaderBoard(String selectedOption) {
        // Connect to the database
        try (Connection connection = DriverManager.getConnection(Main.connectionString)) {
            // Construct the SQL query based on the selected option
            String sqlQuery = buildSqlQuery(selectedOption);

            // Execute the SQL query
            try (PreparedStatement preparedStatement = connection.prepareStatement(sqlQuery);
                 ResultSet resultSet = preparedStatement.executeQuery()) {

                // Process the result set and display the leader board
                StringBuilder leaderBoardInfo = new StringBuilder("\t    Leader Board\n");
                while (resultSet.next()) {
                    // Customize this part based on your table columns
                    String playerName = resultSet.getString("Name");
                    int nameWidth = 20; // Set a fixed width for the "Name" column

                    leaderBoardInfo.append(String.format("%-" + nameWidth + "s %-65s\n", "Name", "Value"));
                    leaderBoardInfo.append(String.format("%-" + nameWidth + "s %-20s\n", playerName, resultSet.getString("value")));
                }


                // Display the leader board in a new window or frame
                displayLeaderBoardFrame(leaderBoardInfo.toString());
            }
        } catch (SQLException ex) {
            ex.printStackTrace();
            JOptionPane.showMessageDialog(this, "Error retrieving leader board data.");
        }
    }

    private String buildSqlQuery(String selectedOption) {
        // Use parameterized queries to prevent SQL injection
        switch (selectedOption) {
            case "Most Runs":
                return "SELECT TOP 1 u.first_name + ' ' + u.last_name AS Name, ps.runs AS value FROM User$ u INNER JOIN PlayerStats ps ON u.id = ps.playerID ORDER BY ps.runs DESC;";
            case "Best Batting Average":
                return "SELECT TOP 1 u.first_name + ' ' + u.last_name AS Name, ps.battingAvg AS value FROM User$ u INNER JOIN PlayerStats ps ON u.id = ps.playerID ORDER BY ps.battingAvg DESC";
            case "Best Batting Strike Rate":
                return "SELECT TOP 1 u.first_name + ' ' + u.last_name AS Name, ps.SR AS value FROM User$ u INNER JOIN PlayerStats ps ON u.id = ps.playerID ORDER BY ps.SR DESC";
            case "Most Wickets":
                return "SELECT TOP 1 u.first_name + ' ' + u.last_name AS Name, ps.wicketsTaken AS value FROM User$ u INNER JOIN PlayerStats ps ON u.id = ps.playerID ORDER BY ps.wicketsTaken DESC";
            case "Best Bowling Average":
                return "SELECT TOP 1 u.first_name + ' ' + u.last_name AS Name, ps.bowlingAvg AS value FROM User$ u INNER JOIN PlayerStats ps ON u.id = ps.playerID ORDER BY ps.bowlingAvg DESC";
            case "Best Bowling Strike Rate":
                return "SELECT TOP 1 u.first_name + ' ' + u.last_name AS Name, (ps.ballsBowled / ps.wicketsTaken) AS value FROM User$ u INNER JOIN PlayerStats ps ON u.id = ps.playerID WHERE ps.wicketsTaken > 0 ORDER BY (ps.ballsBowled / ps.wicketsTaken) ASC";
            case "Best Economy":
                return "SELECT TOP 1 u.first_name + ' ' + u.last_name AS Name, ps.economy AS value FROM User$ u INNER JOIN PlayerStats ps ON u.id = ps.playerID WHERE ps.economy > 0 ORDER BY ps.economy ASC";
            default:
                return ""; // Handle default case appropriately
        }
    }

    private void displayLeaderBoardFrame(String leaderBoardInfo) {
        // Customize this method to display the leader board in a new window or frame
        // Example:
        JFrame leaderBoardFrame = new JFrame("Leader Board");
        leaderBoardFrame.setDefaultCloseOperation(JFrame.DISPOSE_ON_CLOSE);
        leaderBoardFrame.setSize(400, 300);

        JTextArea textArea = new JTextArea(leaderBoardInfo);

        // Set font to Times New Roman and increase the font size
        Font font = new Font("Times New Roman", Font.PLAIN, 16);
        textArea.setFont(font);

        textArea.setEditable(false);
        JScrollPane scrollPane = new JScrollPane(textArea);

        leaderBoardFrame.getContentPane().add(scrollPane);
        leaderBoardFrame.setLocationRelativeTo(this);
        leaderBoardFrame.setVisible(true);
    }

}
