# owner_before
* memory[meta header]
* std[meta namespace]
* shared_ptr[meta class]
* function template[meta id-type]
* cpp11[meta cpp]

```cpp
template <class U>
bool owner_before(const shared_ptr<U>& b) const;          // (1) C++11

template <class U>
bool owner_before(const shared_ptr<U>& b) const noexcept; // (1) C++17

template <class U>
bool owner_before(const weak_ptr<U>& b) const;            // (2) C++11

template <class U>
bool owner_before(const weak_ptr<U>& b) const noexcept;   // (2) C++17
```
* weak_ptr[link /reference/memory/weak_ptr.md]

## 概要
所有権ベースでの小なり比較を行う。


## 戻り値
`*this`が持つリソースと、`b`が持つリソースを、所有権ベースで小なり比較し、`*this`が小さければ`true`、そうでなければ`false`を返す。


## 備考
`shared_ptr`において、`a < b`は以下の動作となる：

```cpp
shared_ptr<T> a = ...;
shared_ptr<T> b = ...;
if (a.get() < b.get()) {}
```

このような、`shared_ptr`が保持するポインタの比較を、「値ベース(value-based)な比較」と言う。

この比較に依�して`shared_ptr`を[`std::set`](/reference/set/set.md)や[`std::map`](/reference/map/map.md)の要素型とすると、問題が起こることがある。`shared_ptr`には、別名コンストラクタ(aliasing constructor)と呼ばれる、以下のオーバー�ードがある：

```cpp
template<class Y>
shared_ptr(const shared_ptr<Y>& r, T* p) noexcept;
```

このコンストラクタを使用すると、所有するリソースは`r`だが、保持するポインタは`p`という状況が発生する。そのため、`std::set<std::shared_ptr<T>>`を使用する場合に、同じリソースが重複登録されることがある。

`owner_before()`は、たとえ別名コンストラクタが使われたとしても、所有するリソースのポインタ比較を行う。この比較方法を、「所有権ベース(ownership-based)な比較」と言う。

技術的には、`shared_ptr`が内部でメモリ確保している、参照カウンタオブジェクトのポインタ比較を行う。


## 例
```cpp example
#include <iostream>
#include <memory>

struct X {
  int i;
  int j;
};

int main()
{
  std::shared_ptr<X> org(new X());

  std::shared_ptr<int> a(org, &(org->i));
  std::shared_ptr<int> b(org, &(org->j));

  bool value_based_result = a < b;
  bool ownership_based_result = a.owner_before(b); // a and b are equivalent

  std::cout << std::boolalpha;
  std::cout << value_based_result << std::endl;
  std::cout << ownership_based_result << std::endl;
}
```
* owner_before[color ff0000]

### 出力
```
true
false
```

## バージョン
### 言語
- C++11

### 処理系
- [GCC](/implementation.md#gcc): 4.4.7
- [Clang](/implementation.md#clang): 3.0
- [ICC](/implementation.md#icc): ?
- [Visual C++](/implementation.md#visual_cpp): 2010, 2012, 2013


## 関連項目
- [`owner_less`](/reference/memory/owner_less.md)


## 参照
- [N1590 Smart Pointer Comparison Operators](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2004/n1590.html)
- [N2637 Revisiting std::shared_ptr comparison](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2008/n2637.pdf)
- [LWG Issue 1406. Support hashing smart-pointers based on owner](http://www.open-std.org/jtc1/sc22/wg21/docs/lwg-active.html#1406)
- [LWG Issue 2873. Add `noexcept` to several `shared_ptr` related functions](https://wg21.cmeerw.net/lwg/issue2873)
