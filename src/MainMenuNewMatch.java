import javax.swing.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.awt.event.WindowAdapter;
import java.awt.event.WindowEvent;
import java.sql.*;

public class MainMenuNewMatch extends JFrame{
    private JPanel panelMain;
    private JComboBox<String> comboTeamA;
    private JComboBox<String> comboTeamB;
    private JComboBox comboTossWinner;
    private JButton btnContinue;
    private JTextField txtStartingTime;
    private JTextField txtVenue;
    private JComboBox comboFormat;
    private JTextField txtDate;
    private JTextField txtMatchNo;
    private JTextField txtUmpire1;
    private JTextField txtUmpire2;
    private JTextField txtUmpire3;
    public static String teamA, teamB, tossWinner, startingTime, venue, format, date, matchNo, umpire1, umpire2, umpire3;

    public JPanel getPanelMain() {
        return panelMain;
    }

    public String[] getPlayerIDs(String teamName) {
        String[] playerIDs = new String[11];

        String query = "SELECT player.user_id FROM Player WHERE playsInTeam = ?";

        try (Connection conn = DriverManager.getConnection(Main.connectionString);
             PreparedStatement stmt = conn.prepareStatement(query)) {

            // Set the parameter for the prepared statement
            stmt.setString(1, teamName);

            try (ResultSet resultSet = stmt.executeQuery()) {
                int index = 0;
                while (resultSet.next() && index < 11) {
                    playerIDs[index] = resultSet.getString("user_id");
                    index++;
                }
            }

        } catch (SQLException e) {
            e.printStackTrace();
        }

        return playerIDs;
    }

    public String[] getPlayerNames(String teamName) {
        String[] playerNames = new String[11];

        String query = "SELECT User$.first_name + ' ' + User$.last_name AS fullName " +
                "FROM Player " +
                "INNER JOIN Team ON Player.playsInTeam = Team.name " +
                "INNER JOIN User$ ON User$.id = Player.user_id " +
                "WHERE Team.name = ?";

        try (Connection conn = DriverManager.getConnection(Main.connectionString);
             PreparedStatement stmt = conn.prepareStatement(query)) {

            // Set the parameter for the prepared statement
            stmt.setString(1, teamName);

            try (ResultSet resultSet = stmt.executeQuery()) {
                int index = 0;
                while (resultSet.next() && index < 11) {
                    String fullName = resultSet.getString("fullName");
                    playerNames[index] = fullName;
                    index++;
                }
            }

        } catch (SQLException e) {
            e.printStackTrace();
        }

        return playerNames;
    }
    public MainMenuNewMatch() {
        // Set up the frame and other components as needed

        // Load team names from the database and set them in the combo boxes
        loadTeamNames();
        btnContinue.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                // get the texts from all the combo boxes
                teamA = (String) comboTeamA.getSelectedItem();
                teamB = (String) comboTeamB.getSelectedItem();
                tossWinner = (String) comboTossWinner.getSelectedItem();
                startingTime = txtStartingTime.getText();
                venue = txtVenue.getText();
                format = (String) comboFormat.getSelectedItem();
                date = txtDate.getText();
                matchNo = txtMatchNo.getText();
                umpire1 = txtUmpire1.getText();
                umpire2 = txtUmpire2.getText();
                umpire3 = txtUmpire3.getText();



                // Create a new batting score card
                BattingScoreCard battingScoreCard = new BattingScoreCard();


                String[] playerNamesTeamA;
                String[] playerIDsTeamA;
                if(tossWinner.equals("Team A")){
                    playerNamesTeamA = getPlayerNames(teamA);
                    playerIDsTeamA = getPlayerIDs(teamA);
                    battingScoreCard.setTeamName(teamA);
                    battingScoreCard.setPlayerIDs(playerIDsTeamA);
                    battingScoreCard.setPlayerNames(playerNamesTeamA);
                }

                String[] playerNamesTeamB;
                String[] playerIDsTeamB;
                if(tossWinner.equals("Team B")){
                    playerNamesTeamB = getPlayerNames(teamB);
                    playerIDsTeamB = getPlayerIDs(teamB);
                    battingScoreCard.setTeamName(teamB);
                    battingScoreCard.setPlayerIDs(playerIDsTeamB);
                    battingScoreCard.setPlayerNames(playerNamesTeamB);
                }

                battingScoreCard.setContentPane(battingScoreCard.getPanelMain());
                battingScoreCard.setSize(400,600);
                battingScoreCard.setLocationRelativeTo(null);
                battingScoreCard.setVisible(true);
                battingScoreCard.setDefaultCloseOperation(JFrame.DISPOSE_ON_CLOSE);

                // create bowling score card for the other Team


                BowlingScoreCardGUIController bowlingScoreCard = new BowlingScoreCardGUIController();


                if(tossWinner.equals("Team A")){
                    playerNamesTeamB = getPlayerNames(teamB);
                    playerIDsTeamB = getPlayerIDs(teamB);
                    bowlingScoreCard.setTeamName(teamB);
                    bowlingScoreCard.setPlayerIDs(playerIDsTeamB);
                    bowlingScoreCard.setPlayerNames(playerNamesTeamB);
                }

                if(tossWinner.equals("Team B")){
                    playerNamesTeamA = getPlayerNames(teamA);
                    playerIDsTeamA = getPlayerIDs(teamA);
                    bowlingScoreCard.setTeamName(teamA);
                    bowlingScoreCard.setPlayerIDs(playerIDsTeamA);
                    bowlingScoreCard.setPlayerNames(playerNamesTeamA);
                }

                bowlingScoreCard.setContentPane(bowlingScoreCard.getPanelMain());
                bowlingScoreCard.setSize(400,600);
                bowlingScoreCard.setLocationRelativeTo(null);
                bowlingScoreCard.setVisible(true);
                bowlingScoreCard.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);

            }
        });
    }

    private void loadTeamNames() {
        String query = "SELECT name FROM Team";

        try (Connection conn = DriverManager.getConnection(Main.connectionString);
             PreparedStatement stmt = conn.prepareStatement(query);
             ResultSet resultSet = stmt.executeQuery()) {

            while (resultSet.next()) {
                String teamName = resultSet.getString("name");

                // Add team names to the combo boxes
                comboTeamA.addItem(teamName);
                comboTeamB.addItem(teamName);
            }
        } catch (SQLException e) {
            e.printStackTrace(); // Handle the exception according to your needs
        }
    }


}
