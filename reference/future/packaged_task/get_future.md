#get_future
```cpp
future<R> get_future();
```
* future[link /reference/future/future.md]

##概要

<b>結果取得のためのfutureオブジェクトを取得する</b>


##戻り値

`*this`と同じ共有状態を持つ`[future](/reference/future/future.md)<R>`オブジェクトを返す


##例外

この関数は、以下のerror conditionを持つ[future_error](/reference/future/future_error.md)例外オブジェクトを送出する可能性がある：

- [`future_already_retrieved`](/reference/future/future_errc.md) ： すでにこの関数によって共有状態が作られている
- `[no_state](/reference/future/future_errc.md) `： `*this`が共有状態を持っていない(デフォルト構築された`packaged_task`、ムーブされたあとなどに起こりうる)



##例

```cpp
#include <iostream>
#include <future>

int calc() { return 3; }

int main()
{
  std::packaged_task<int()> task(calc); // calc()を非同期タスクとして登録
  std::future<int> f = task.get_future(); // 結果値取得のためのfutureを取得

  // タスクを実行
  task();

  // 結果を取得
  int result = f.get();
  std::cout << result << std::endl;
}
```
* get_future[color ff0000]

###出力

```cpp
3
```

##バージョン


###言語


- C++11



###処理系

- [Clang](/implementation#clang.md): ??
- [GCC](/implementation#gcc.md): 
- [GCC, C++0x mode](/implementation#gcc.md): 4.7.0
- [ICC](/implementation#icc.md): ??
- [Visual C++](/implementation#visual_cpp.md) ??



##参照


