import javax.swing.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.sql.*;

public class MainMenuNewMatchController extends JFrame{
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
    public MainMenuNewMatchController() {
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
                BattingScoreCardController battingScoreCardController = new BattingScoreCardController();

                String[] playerNamesTeamA;
                String[] playerIDsTeamA;
                if(tossWinner.equals("Team A")){
                    playerNamesTeamA = getPlayerNames(teamA);
                    playerIDsTeamA = getPlayerIDs(teamA);
                    battingScoreCardController.setTeamName(teamA);
                    battingScoreCardController.setPlayerIDs(playerIDsTeamA);
                    battingScoreCardController.setPlayerNames(playerNamesTeamA);
                }

                String[] playerNamesTeamB;
                String[] playerIDsTeamB;
                if(tossWinner.equals("Team B")){
                    playerNamesTeamB = getPlayerNames(teamB);
                    playerIDsTeamB = getPlayerIDs(teamB);
                    battingScoreCardController.setTeamName(teamB);
                    battingScoreCardController.setPlayerIDs(playerIDsTeamB);
                    battingScoreCardController.setPlayerNames(playerNamesTeamB);
                }

                battingScoreCardController.setContentPane(battingScoreCardController.getPanelMain());
                battingScoreCardController.setSize(400,600);
                battingScoreCardController.setLocationRelativeTo(null);
                battingScoreCardController.setVisible(true);
                battingScoreCardController.setDefaultCloseOperation(JFrame.DISPOSE_ON_CLOSE);

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

                // create batting score card for other team

                // Create a new batting score card
                BattingScoreCardController battingScoreCard_Controller_opponennt = new BattingScoreCardController();
                battingScoreCard_Controller_opponennt.setInningsFlag2nd();

                if(tossWinner.equals("Team A")){
                    playerNamesTeamB = getPlayerNames(teamB);
                    playerIDsTeamB = getPlayerIDs(teamB);
                    battingScoreCard_Controller_opponennt.setTeamName(teamB);
                    battingScoreCard_Controller_opponennt.setPlayerIDs(playerIDsTeamB);
                    battingScoreCard_Controller_opponennt.setPlayerNames(playerNamesTeamB);
                }

                if(tossWinner.equals("Team B")){
                    playerNamesTeamA = getPlayerNames(teamA);
                    playerIDsTeamA = getPlayerIDs(teamA);
                    battingScoreCard_Controller_opponennt.setTeamName(teamA);
                    battingScoreCard_Controller_opponennt.setPlayerIDs(playerIDsTeamA);
                    battingScoreCard_Controller_opponennt.setPlayerNames(playerNamesTeamA);
                }

                battingScoreCard_Controller_opponennt.setContentPane(battingScoreCard_Controller_opponennt.getPanelMain());
                battingScoreCard_Controller_opponennt.setSize(400,600);
                battingScoreCard_Controller_opponennt.setLocationRelativeTo(null);
                battingScoreCard_Controller_opponennt.setVisible(true);
                battingScoreCard_Controller_opponennt.setDefaultCloseOperation(JFrame.DISPOSE_ON_CLOSE);

                // create bowling score card for the other Team

                BowlingScoreCardGUIController bowlingScoreCard_opponent = new BowlingScoreCardGUIController();
                bowlingScoreCard_opponent.setInningsFlag2nd();

                if(tossWinner.equals("Team A")){
                    playerNamesTeamA = getPlayerNames(teamA);
                    playerIDsTeamA = getPlayerIDs(teamA);
                    bowlingScoreCard_opponent.setTeamName(teamA);
                    bowlingScoreCard_opponent.setPlayerIDs(playerIDsTeamA);
                    bowlingScoreCard_opponent.setPlayerNames(playerNamesTeamA);
                }

                if(tossWinner.equals("Team B")){
                    playerNamesTeamB = getPlayerNames(teamB);
                    playerIDsTeamB = getPlayerIDs(teamB);
                    bowlingScoreCard_opponent.setTeamName(teamB);
                    bowlingScoreCard_opponent.setPlayerIDs(playerIDsTeamB);
                    bowlingScoreCard_opponent.setPlayerNames(playerNamesTeamB);
                }

                bowlingScoreCard_opponent.setContentPane(bowlingScoreCard_opponent.getPanelMain());
                bowlingScoreCard_opponent.setSize(400,600);
                bowlingScoreCard_opponent.setLocationRelativeTo(null);
                bowlingScoreCard_opponent.setVisible(true);
                bowlingScoreCard_opponent.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
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
