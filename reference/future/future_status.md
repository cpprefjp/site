#future_status (C++11)
* future[meta header]

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
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 
- [GCC, C++0x mode](/implementation.md#gcc): 4.7.0
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 11.0


##参照


