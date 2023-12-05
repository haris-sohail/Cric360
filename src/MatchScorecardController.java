import javax.swing.*;
import java.awt.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.sql.*;
import java.util.Random;

public class MatchScorecardController extends JFrame {
    private JPanel panelMain;
    private JButton OKButton;
    private JComboBox<String> comboBoxTeamA;
    private JComboBox<String> comboBoxTeamB;

    public JPanel getPanelMain() {
        return panelMain;
    }

    public MatchScorecardController() {
        OKButton.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                // Get the selected teams from the combo boxes
                String teamA = (String) comboBoxTeamA.getSelectedItem();
                String teamB = (String) comboBoxTeamB.getSelectedItem();

                // Simulate scores and wickets (replace with your logic)
                int scoreA = simulateScore();
                int wicketsA = simulateWickets();
                int scoreB = simulateScore();
                int wicketsB = simulateWickets();

                // Determine the winner
                String winner = (scoreA > scoreB) ? teamA : teamB;

                // Display the match scorecard in a new frame
                displayMatchScorecard(teamA, teamB, scoreA, wicketsA, scoreB, wicketsB, winner);
            }
        });

        // Fetch teams from the database and populate combo boxes
        fetchTeamsAndPopulateComboBoxes();
    }

    private void fetchTeamsAndPopulateComboBoxes() {
        try (Connection connection = DriverManager.getConnection("jdbc:sqlserver://DESKTOP-2BV11P4\\SQLEXPRESS:50143;Database=Cric360;IntegratedSecurity=true;encrypt=false");
             Statement statement = connection.createStatement();
             ResultSet resultSet = statement.executeQuery("SELECT name FROM Team")) {

            DefaultComboBoxModel<String> teamModelA = new DefaultComboBoxModel<>();
            DefaultComboBoxModel<String> teamModelB = new DefaultComboBoxModel<>();

            // Add team names to the combo box models
            while (resultSet.next()) {
                String teamName = resultSet.getString("name");
                teamModelA.addElement(teamName);
                teamModelB.addElement(teamName);
            }

            // Set models to combo boxes
            comboBoxTeamA.setModel(teamModelA);
            comboBoxTeamB.setModel(teamModelB);

        } catch (SQLException ex) {
            ex.printStackTrace();
            JOptionPane.showMessageDialog(this, "Error retrieving team names from the database.");
        }
    }

    private int simulateScore() {
        // Simulate a score between 150 and 217 (replace with your logic)
        return new Random().nextInt(68) + 150;
    }

    private int simulateWickets() {
        // Simulate wickets between 1 and 10 (replace with your logic)
        return new Random().nextInt(10) + 1;
    }

    private void displayMatchScorecard(String teamA, String teamB, int scoreA, int wicketsA, int scoreB, int wicketsB, String winner) {
        // Customize this method to display the match scorecard in a new window or frame
        // Example:
        JFrame scorecardFrame = new JFrame("Match Scorecard");
        scorecardFrame.setDefaultCloseOperation(JFrame.DISPOSE_ON_CLOSE);
        scorecardFrame.setSize(400, 300);

        JTextArea textArea = new JTextArea();
        textArea.setFont(new Font("Times New Roman", Font.BOLD, 16));
        textArea.setEditable(false);

        // Display heading
        textArea.append(centerTextColored(teamA + " vs " + teamB, Color.MAGENTA) + "\n\n");

        // Display scores and wickets
        textArea.append(teamA + String.format("%-20s %-20s\n", " Score: " + scoreA, " Wickets: " + wicketsA));
        textArea.append(teamB + String.format("%-20s %-20s\n", " Score: " + scoreB, " Wickets: " + wicketsB) + "\n");

        // Display winner
        textArea.append(centerTextColored("Winner: " + winner, Color.BLUE));

        JScrollPane scrollPane = new JScrollPane(textArea);

        scorecardFrame.getContentPane().add(scrollPane, BorderLayout.CENTER);
        scorecardFrame.setLocationRelativeTo(this);
        scorecardFrame.setVisible(true);

        // Set foreground color for Winner line
        textArea.setForeground(Color.DARK_GRAY);
    }

    private String centerTextColored(String text, Color color) {
        // Center the text within a line and apply the specified color
        int width = 50; // Adjust the width as needed
        int padding = (width - text.length()) / 2;
        return " ".repeat(Math.max(0, padding)) + text;
    }



    private String centerText(String text) {
        // Center the text within a line
        int width = 50; // Adjust the width as needed
        int padding = (width - text.length()) / 2;
        return " ".repeat(Math.max(0, padding)) + text;
    }



}
