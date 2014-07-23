#owner_before (C++11)
```cpp
template <class U>
bool owner_before(const shared_ptr<U>& b) const; // (1)

template <class U>
bool owner_before(const weak_ptr<U>& b) const;   // (2)
```
* weak_ptr[link /reference/memory/weak_ptr.md]

##概要
所有権ベースでの小なり比較を行う。


##戻り値
`*this`が持つリソースと、`b`が持つリソースを、所有権ベースで小なり比較し、`*this`が小さければ`true`、そうでなければ`false`を返す。


##備考
`shared_ptr`において、`a < b`は以下の動作となる：

```cpp
shared_ptr<T> a = ...;
shared_ptr<T> b = ...;
if (a.get() < b.get()) {}
```

このような、`shared_ptr`が保持するポインタの比較を、「値ベース(value-based)な比較」と言う。

この比較に依存して`shared_ptr`を[`std::set`](/reference/set/set.md)や[`std::map`](/reference/map/map.md)の要素型とすると、問題が起こることがある。`shared_ptr`には、別名コンストラクタ(aliasing constructor)と呼ばれる、以下のオーバーロードがある：

```cpp
template<class Y>
shared_ptr(const shared_ptr<Y>& r, T* p) noexcept;
```

このコンストラクタを使用すると、所有するリソースは`r`だが、保持するポインタは`p`という状況が発生する。そのため、`std::set<std::shared_ptr<T>>`を使用する場合に、同じリソースが重複登録されることがある。

`owner_before()`は、たとえ別名コンストラクタが使われたとしても、所有するリソースのポインタ比較を行う。この比較方法を、「所有権ベース(ownership-based)な比較」と言う。

技術的には、`shared_ptr`が内部でメモリ確保している、参照カウンタオブジェクトのポインタ比較を行う。


##例
```cpp
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

###出力
```
true
false
```

##バージョン
###言語
- C++11

###処理系
- [GCC](/implementation#gcc.md): 4.4.7
- [Clang libc++, C++11 mode](/implementation#clang.md): 3.0
- [ICC](/implementation#icc.md): ?
- [Visual C++](/implementation#visual_cpp.md): 10.0, 11.0, 12.0

##参照
- [`owner_less`](/reference/memory/owner_less.md)
- [N1590 Smart Pointer Comparison Operators](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2004/n1590.html)
- [N2637 Revisiting std::shared_ptr comparison](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2008/n2637.pdf)
- [LWG Issue 1406. Support hashing smart-pointers based on owner](http://www.open-std.org/jtc1/sc22/wg21/docs/lwg-closed.html#1406)

