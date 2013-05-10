#future_status
```cpp
namespace std {
  enum class future_status {
    ready,
    timeout,
    deferred
  };
}
```

##概要
[`future`](./future.md)オブジェクトの状態値。

| | |
|-----------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| 列挙値 | 説明 |
| `ready` | 共有状態の準備ができている([`future`](./future.md)`::get()`で即値が返ってくる状態) |
| `timeout` | 制限時間付きの待機処理がタイムアウトした |
| `deferred` | 処理する関数が遅延実行指定されている |
 

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


