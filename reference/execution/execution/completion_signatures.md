# completion_signatures
* execution[meta header]
* class template[meta id-type]
* std::execution[meta namespace]
* cpp26[meta cpp]

```cpp
namespace std::execution {
  template<completion-signature... Fns>
  struct completion_signatures {
    template<class Tag>
    static constexpr size_t count-of(Tag) { return see below; }

    template<class Fn>
    static constexpr void for-each(Fn&& fn) {  // exposition only
      (fn(static_cast<Fns*>(nullptr)), ...);
    }
  };
}
```

## 概要
`completion_signatures`クラステンプレートは、完了シグネチャの集合をテンプレートパラメータとして表現する。

式`tag`の[decayed](/reference/type_traits/decay.md)型を`Tag`としたとき、説明専用のメンバ関数`count-of`は`Fns`中の`Tag(Ts...)`形式で表される関数型の個数を返す。


### 説明専用のコンセプト `valid-completion-signatures`
```cpp
template<class Sigs>
concept valid-completion-signatures = see below;
```

`Sigs`が`completion_signatures`クラステンプレートの特殊化であるとき、`Sigs`は説明専用コンセプト`valid-completion-signatures`のモデルである。


## テンプレートパラメータ制約
`Fns`の各要素`Fn`が、下記の説明専用コンセプト`completion-signature`を満たすこと。

```cpp
template<class Fn>
concept completion-signature = see below;
```

型`Fn`が下記いずれかを満たす関数型であるとき、`Fn`はコンセプト`completion-signature`を満たす。
- [`set_value_t`](set_value.md)`(Vs...)`（`Vs`はオブジェクト型または参照型のパック）
- [`set_error_t`](set_error.md)`(Err)`（`Err`はオブジェクト型または参照型）
- [`set_stopped_t`](set_stopped.md)`()`


## 例
```cpp example
#include <execution>
namespace ex = std::execution;

int main()
{
  // 下記の完了操作をサポートする完了シグネチャ集合型
  //   値完了     set_value(int), set_value(int, int)
  //   エラー完了 set_error(std::exception_ptr)
  //   停止完了   set_stopped()
  using Sigs = ex::completion_signatures<
    ex::set_value_t(int),
    ex::set_value_t(int, int),
    ex::set_error_t(std::exception_ptr),
    ex::set_stopped_t()
  >;
}
```
* ex::completion_signatures[color ff0000]
* ex::set_value_t[link set_value.md]
* ex::set_error_t[link set_error.md]
* ex::set_stopped_t[link set_stopped.md]
* std::exception_ptr[link /reference/exception/exception_ptr.md]

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
- [`execution::get_completion_signatures`](get_completion_signatures.md)
- [`execution::set_value_t`](set_value.md)
- [`execution::set_error_t`](set_error.md)
- [`execution::set_stopped_t`](set_stopped.md)


## 参照
- [P2300R10 `std::execution`](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2024/p2300r10.html)
- [P3557R3 High-Quality Sender Diagnostics with Constexpr Exceptions](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3557r3.html)
- [LWG4448 Do not forward `fn` in `completion_signatures`](https://cplusplus.github.io/LWG/issue4448)
