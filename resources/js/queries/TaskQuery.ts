import { useQuery, useQueryClient, useMutation } from "react-query";
import { getTasks, updateDoneTask } from "../api/TaskApi";
import { toast } from "react-toastify";

export const useTasks = () => {
    return useQuery('tasks', () => getTasks());
}

export const useUpdateDoneTask = () => {
    const queryClient = useQueryClient();

    return useMutation(updateDoneTask, {
        // updateDoneTask を実行し、成功したらonSuccess が呼び出される
        // invalidateQueries でキャッシュを破棄してデータを再取得する
        onSuccess: () => {
            queryClient.invalidateQueries('tasks');
        },
        onError: () => {
            toast.error('更新に失敗しました');
        }
    });
}
