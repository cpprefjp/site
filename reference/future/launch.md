#launch
* future[meta header]
* std[meta namespace]
* enum[meta id-type]
* cpp11[meta cpp]

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

##概要
[`async()`](async.md)関数に指定する実行ポリシーを表す、ビットマスクの列挙型。

列挙値の基底型は未規定。


| 列挙値 | 説明 | 対応バージョン |
|--------|------|----------------|
| `async` | 関数を別スレッドで非同期実行する。値は未規定。 | C++11 |
| `deferred` | [`future`](future.md)から値を取り出すタイミングまで関数の評価を遅延させる。値は未規定。 | C++11 |
| 実装定義の列挙値 | 実装による拡張実行ポリシーを許可する | C++11 |


##バージョン
###言語
- C++11

###処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 
- [GCC, C++11 mode](/implementation.md#gcc): 4.7.0
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 11.0


##参照
- [LWG Issue 2102. Why is `std::launch` an implementation-defined type?](http://www.open-std.org/jtc1/sc22/wg21/docs/lwg-defects.html#2102)

