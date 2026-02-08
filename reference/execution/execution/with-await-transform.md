# with-await-transform
* [meta exposition-only]
* execution[meta header]
* class template[meta id-type]
* std::execution[meta namespace]
* cpp26[meta cpp]

```cpp
namespace std::execution {
  template<class T, class Promise>
  concept has-as-awaitable =  // exposition only
    requires (T&& t, Promise& p) {
      { std::forward<T>(t).as_awaitable(p) } -> is-awaitable<Promise&>;
    };

  template<class Derived>
  struct with-await-transform {  // exposition only
    template<class T>
    T&& await_transform(T&& value) noexcept {
      return std::forward<T>(value);
    }

    template<has-as-awaitable<Derived> T>
    auto await_transform(T&& value)
      noexcept(noexcept(std::forward<T>(value).as_awaitable(declval<Derived&>())))
      -> decltype(std::forward<T>(value).as_awaitable(declval<Derived&>()))
    {
      return std::forward<T>(value).as_awaitable(static_cast<Derived&>(*this));
    }
  };
}
```
* is-awaitable[link ../is-awaitable.md]

## 概要
`with-await-transform`は、実行制御ライブラリの仕様定義で用いられる説明専用のクラステンプレートである。


## バージョン
### 言語
- C++26

## 関連項目
- [`execution::sender`](sender.md)
- [`execution::connect`](connect.md)


## 参照
- [P2300R10 `std::execution`](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2024/p2300r10.html)
- [LWG 4201. `with-await-transform::await_transform` should not use a deduced return type](https://cplusplus.github.io/LWG/issue4201)
