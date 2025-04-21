# prop
* execution[meta header]
* class template[meta id-type]
* std::execution[meta namespace]
* cpp26[meta cpp]

```cpp
namespace std::execution {
  template<class QueryTag, class ValueType>
  struct prop {
    QueryTag query_;   // exposition only
    ValueType value_;  // exposition only

    constexpr const ValueType& query(QueryTag) const noexcept {
      return value_;
    }
  };

  template<class QueryTag, class ValueType>
  prop(QueryTag, ValueType) -> prop<QueryTag, unwrap_reference_t<ValueType>>;
}
```
* unwrap_reference_t[link /reference/type_traits/unwrap_reference.md]

## 概要
`QueryTag`型クエリオブジェクトのキーと`ValueType`型の値から、[クエリ可能オブジェクト](../queryable.md)を構築する。


## 適格要件
説明用の`prop-like`テンプレートクラスを用いて、`QueryTag`と`ValueType`が`callable<QueryTag, prop-like<ValueType>>`のモデルであること。

```cpp
template<class ValueType>
struct prop-like {
  const ValueType& query(auto) const noexcept;
};
```


## 例
```cpp example
#include <stop_token>
#include <execution>
namespace ex = std::execution;

int main()
{
  auto env0 = ex::prop(std::get_stop_token, std::never_stop_token{});
}
```
* ex::prop[color ff0000]
* std::get_stop_token[link ../get_stop_token.md]
* std::never_stop_token[link /reference/stop_token/never_stop_token.md]

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
- [`execution::env`](env.md)


## 参照
- [P3325R5 A Utility for Creating Execution Environments](https://open-std.org/jtc1/sc22/wg21/docs/papers/2024/p3325r5.html)
