# is_execution_policy
* execution[meta header]
* std[meta namespace]
* class template[meta id-type]
* cpp17[meta cpp]

```cpp
namespace std {
  template <class T>
  struct is_execution_policy;

  template <class T>
  inline constexpr bool is_execution_policy_v = is_execution_policy<T>::value;
}
```

## 概要
`is_execution_policy`は、型`T`が実行ポリシー型かを判定する型特性である。

型`T`が標準もしくは実装が定義する実行ポリシー型であれば、この型は[`std::true_type`](/reference/type_traits/true_type.md)型から派生し、そうでなければ[`std::false_type`](/reference/type_traits/false_type.md)型から派生する。


## 備考
このクラステンプレートを特殊化した場合の動作は未定義となる。


## 例
```cpp example
#include <execution>

int main()
{
  static_assert(std::is_execution_policy<std::execution::sequenced_policy>{});
  static_assert(std::is_execution_policy<std::execution::parallel_policy>{});
  static_assert(std::is_execution_policy<std::execution::parallel_unsequenced_policy>{});
}
```
* std::is_execution_policy[color ff0000]
* std::execution::sequenced_policy[link execution/execution_policy.md]
* std::execution::parallel_policy[link execution/execution_policy.md]
* std::execution::parallel_unsequenced_policy[link execution/execution_policy.md]

### 出力
```
```

## バージョン
### 言語
- C++17

### 処理系
- [Clang](/implementation.md#clang):
- [GCC](/implementation.md#gcc):
- [Visual C++](/implementation.md#visual_cpp): ??
