# emplace
* any[meta header]
* std[meta namespace]
* any[meta class]
* function template[meta id-type]
* cpp17[meta cpp]

```cpp
template <class T, class... Args>
decay_t<T>& emplace(Args&&... args); // (1)

template <class T, class U, class... Args>
decay_t<T>& emplace(std::initializer_list<U> il,
                    Args&&... args); // (2)
```
* decay_t[link /reference/type_traits/decay.md]

## 概要
要素型のコンストラクタ引数から直接構築する。

- (1) : 任意の型`T`のコンストラクタ引数`args...`をとり、この関数内部で`T`型オブジェクトを構築して代入する
- (2) : 任意の型`T`のコンストラクタ引数`il`と`args...`をとり、この関数内部で`T`型オブジェクトを構築して代入する


## テンプレートパラメータ制約
- (1) : `using VT =` [`std::decay_t<T>`](/reference/type_traits/decay.md)であるとして、
    - [`std::copy_constructible`](/reference/concepts/copy_constructible.md)`<VT>`および、
    - [`std::constructible_from`](/reference/concepts/constructible_from.md)`<VT, Args...>`を満たすこと
- (2) : `using VT =` [`std::decay_t<T>`](/reference/type_traits/decay.md)であるとして、
    - [`std::copy_constructible`](/reference/concepts/copy_constructible.md)`<VT>`および、
    - [`std::constructible_from`](/reference/concepts/constructible_from.md)`<VT,` [`std::initializer_list`](/reference/initializer_list/initializer_list.md)`<U>&, Args...>`を満たすこと


## 効果
- (1) : [`reset()`](reset.md)を呼び出す。その後[`std::forward`](/reference/utility/forward.md)`<Args>(value)...`をコンストラクタ引数として、型[`std::decay_t<T>`](/reference/type_traits/decay.md)のオブジェクトを直接構築して保持する
- (2) : [`reset()`](reset.md)を呼び出す。その後`il`と[`std::forward`](/reference/utility/forward.md)`<Args>(value)...`をコンストラクタ引数として、型[`std::decay_t<T>`](/reference/type_traits/decay.md)のオブジェクトを直接構築して保持する


## 戻り値
- 構築されたオブジェクトへの参照を返す


## 事後条件
- (1), (2) : `*this`は値を保持した状態となる


## 例外
- (1), (2) : 型[`std::decay_t<T>`](/reference/type_traits/decay.md)の選択されたコンストラクタが、任意の例外を送出する可能性がある


## 例
```cpp example
#include <any>
#include <string>
#include <vector>
#include <cassert>

int main()
{
  // (1)
  {
    std::any x;

    // std::string型のオブジェクトを、コンストラクタ引数として3と'z'を渡して構築する
    x.emplace<std::string>(3, 'z');
    assert(std::any_cast<std::string>(x) == "zzz");
  }

  // (2)
  {
    std::allocator<int> alloc;
    std::any x;
    x.emplace<std::vector<int>>({3, 1, 4}, alloc);

    const auto& vec = std::any_cast<const std::vector<int>&>(x);
    assert(vec[0] == 3);
    assert(vec[1] == 1);
    assert(vec[2] == 4);
  }
}
```
* emplace[color ff0000]
* std::any_cast[link /reference/any/any_cast.md]

### 出力
```
```

## バージョン
### 言語
- C++17

### 処理系
- [Clang](/implementation.md#clang): 4.0.1 [mark verified]
- [GCC](/implementation.md#gcc): 7.3 [mark verified]
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??
