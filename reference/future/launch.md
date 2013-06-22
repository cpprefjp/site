#launch
```cpp
namespace std {
  enum class launch : unspecified {
    async = unspecified,
    deferred = unspecified,
    implementation-defined
  };
}
```
* unspecified[italic]
* implementation-defined[italic]

##概要
[`async()`](./async.md)関数に指定する実行ポリシー。
列挙値の基底型は実装定義のビットマスク型。

| 列挙値 | 説明 |
|--------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `async` | 関数を別スレッドで非同期実行する。値は未規定。 |
| `deferred` | [`future`](./future.md)から値を取り出すタイミングまで関数の評価を遅延させる。値は未規定。 |
| 実装定義の列挙値 | 実装による拡張実行ポリシーを許可する |


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


