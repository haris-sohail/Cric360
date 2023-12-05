import javax.swing.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

public class Player_MainMenuController extends JFrame{
    private JButton btnJoinTeam;
    private JPanel panelMain;
    private JButton btnSeeRequests;
    private JButton leaderboardbutton;
    private JButton logoutButton;

    public Player_MainMenuController() {
        btnJoinTeam.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                // open join team form
                JoinTeamController joinTeamController = new JoinTeamController();
                joinTeamController.setContentPane(joinTeamController.getPanelMain());
                joinTeamController.setSize(400, 400);
                joinTeamController.setLocationRelativeTo(null);
                joinTeamController.setVisible(true);
                joinTeamController.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);

                dispose();
            }
        });
        btnSeeRequests.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                // create a new form
                SeeRequestsController seeRequestsController = new SeeRequestsController();
                seeRequestsController.setContentPane(seeRequestsController.getPanelMain());
                seeRequestsController.setSize(400, 400);
                seeRequestsController.setLocationRelativeTo(null);
                seeRequestsController.setVisible(true);
                seeRequestsController.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);

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
                LeaderBoardController leaderBoard_Controller_obj = new LeaderBoardController();
                leaderBoard_Controller_obj.setContentPane(leaderBoard_Controller_obj.getPanelMain());
                leaderBoard_Controller_obj.setSize(400, 400);
                leaderBoard_Controller_obj.setLocationRelativeTo(null);
                leaderBoard_Controller_obj.setVisible(true);
                leaderBoard_Controller_obj.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);

                dispose();
            }
        });
    }

    public JPanel getPanelMain(){
        return panelMain;
    }
}
