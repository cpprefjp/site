# set_error
* execution[meta header]
* cpo[meta id-type]
* std::execution[meta namespace]
* cpp26[meta cpp]

```cpp
namespace std::execution {
  struct set_error_t { unspecified };  // タグ型

  inline constexpr set_error_t set_error{};
}
```
* unspecified[italic]

## 概要
`set_error`は、非同期操作の失敗完了を表現するエラー(error)完了関数である。完了関数の呼び出しは完了操作と呼ばれる。

エラー完了関数には完了タグ`set_error_t`が関連付けられ、完了操作のエラー完了シグネチャは戻り値型`set_error_t`と1個の引数を持つ関数型として表現される。


## 効果
- 引数`rcvr`が左辺値またはconst右辺値の場合、式`set_error(rcvr, err)`は不適格となる。
- そうでなければ、`rcvr.set_error(err)`と等価である。


## 例外
投げない


## カスタマイゼーションポイント
[Receiver型](receiver.md)の非const右辺値`rcvr`に対して式`rcvr.set_error(err)`が呼び出される。
このとき、`noexcept(rcvr.set_error(err)) == true`であること。


## 備考
完了関数`set_error`は[Sender](sender.md)内部実装から呼び出される想定であり、実行制御ライブラリ利用者が直接利用する必要はない。


## 例
```cpp example
#include <execution>
namespace ex = std::execution;

struct ErrorReceiver {
  using receiver_concept = ex::receiver_t;

  // エラー完了シグネチャ set_error_t(int)
  void set_error(int) && noexcept {}
};

int main()
{
  ErrorReceiver rcvr;
  ex::set_error(std::move(rcvr), 42);
}
```
* ex::set_error[color ff0000]
* ex::receiver_t[link receiver.md]

### 出力
```
```


## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 関連項目
- [`execution::receiver`](receiver.md)
- [`execution::set_value_t`](set_value.md)
- [`execution::set_stopped_t`](set_stopped.md)


## 参照
- [P2300R10 `std::execution`](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2024/p2300r10.html)
