import javax.swing.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

public class Player_MainMenu extends JFrame{
    private JButton btnJoinTeam;
    private JPanel panelMain;
    private JButton btnSeeRequests;
    private JButton leaderboardbutton;
    private JButton logoutButton;

    public Player_MainMenu() {
        btnJoinTeam.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                // open join team form
                JoinTeamGUI joinTeamGUI = new JoinTeamGUI();
                joinTeamGUI.setContentPane(joinTeamGUI.getPanelMain());
                joinTeamGUI.setSize(400, 400);
                joinTeamGUI.setLocationRelativeTo(null);
                joinTeamGUI.setVisible(true);
                joinTeamGUI.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);

                dispose();
            }
        });
        btnSeeRequests.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                // create a new form
                SeeRequestsGUI seeRequestsGUI = new SeeRequestsGUI();
                seeRequestsGUI.setContentPane(seeRequestsGUI.getPanelMain());
                seeRequestsGUI.setSize(400, 400);
                seeRequestsGUI.setLocationRelativeTo(null);
                seeRequestsGUI.setVisible(true);
                seeRequestsGUI.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);

                dispose();
            }
        });
        logoutButton.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                Main.handleSignup();
                dispose();
            }
        });
        leaderboardbutton.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                System.out.println("Show Leaderboard");
                LeaderBoard leaderBoard_obj = new LeaderBoard();
                leaderBoard_obj.setContentPane(leaderBoard_obj.getPanelMain());
                leaderBoard_obj.setSize(400, 400);
                leaderBoard_obj.setLocationRelativeTo(null);
                leaderBoard_obj.setVisible(true);
                leaderBoard_obj.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);

                dispose();
            }
        });
    }

    public JPanel getPanelMain(){
        return panelMain;
    }
}
