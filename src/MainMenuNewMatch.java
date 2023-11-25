import javax.swing.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
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

    public JPanel getPanelMain() {
        return panelMain;
    }

    public MainMenuNewMatch() {
        // Set up the frame and other components as needed

        // Load team names from the database and set them in the combo boxes
        loadTeamNames();
        btnContinue.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                // get the texts from all the combo boxes
                String teamA = (String) comboTeamA.getSelectedItem();
                String teamB = (String) comboTeamB.getSelectedItem();
                String tossWinner = (String) comboTossWinner.getSelectedItem();
                String startingTime = txtStartingTime.getText();
                String venue = txtVenue.getText();
                String format = (String) comboFormat.getSelectedItem();
                String date = txtDate.getText();
                String matchNo = txtMatchNo.getText();
                String umpire1 = txtUmpire1.getText();
                String umpire2 = txtUmpire2.getText();
                String umpire3 = txtUmpire3.getText();


                // Create a new batting score card
                BattingScoreCard battingScoreCard = new BattingScoreCard();
                battingScoreCard.setContentPane(battingScoreCard.getPanelMain());
                battingScoreCard.setSize(400,600);
                battingScoreCard.setLocationRelativeTo(null);
                battingScoreCard.setVisible(true);
                battingScoreCard.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);


                dispose();

//                // Create a new match object
//                Match newMatch = new Match(teamA, teamB, tossWinner);
//
//                // Show the new match screen
//                newMatch.setContentPane(newMatch.getPanelMain());
//                newMatch.setSize(400,400);
//                newMatch.setLocationRelativeTo(null);
//                newMatch.setVisible(true);
//                newMatch.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
//
//                dispose();
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
