#owner_before (C++11)
* memory[meta header]
* std[meta namespace]
* weak_ptr[meta class]
* function[meta id-type]

```cpp
template <class U>
bool owner_before(const shared_ptr<U>& b) const; // (1)

template <class U>
bool owner_before(const weak_ptr<U>& b) const;   // (2)
```
* shared_ptr[link /reference/memory/shared_ptr.md]

##概要
所有権ベースでの小なり比較を行う。


##戻り値
`*this`が監視している[`shared_ptr`](/reference/memory/shared_ptr.md)オブジェクトのリソースと、`b`が監視している[`shared_ptr`](/reference/memory/shared_ptr.md)オブジェクトのリソースを、所有権ベースで小なり比較し、`*this`が小さければ`true`、そうでなければ`false`を返す。

詳細は、[`shared_ptr`](/reference/memory/shared_ptr.md)の[`owner_before()`](/reference/memory/shared_ptr/owner_before.md)メンバ関数を参照。


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

  std::shared_ptr<int> sa(org, &(org->i));
  std::shared_ptr<int> sb(org, &(org->j));

  std::weak_ptr<int> wa = sa;
  std::weak_ptr<int> wb = sb;

  bool ownership_based_result = wa.owner_before(wb); // wa and wb are equivalent

  std::cout << std::boolalpha << ownership_based_result << std::endl;
}
```

###出力
```
false
```

##バージョン
###言語
- C++11

###処理系
- [GCC](/implementation.md#gcc): 4.4.7
- [Clang libc++, C++11 mode](/implementation.md#clang): 3.0
- [ICC](/implementation.md#icc): ?
- [Visual C++](/implementation.md#visual_cpp): ?

##参照
- [`owner_less`](/reference/memory/owner_less.md)
- [N1590 Smart Pointer Comparison Operators](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2004/n1590.html)
- [N2637 Revisiting std::shared_ptr comparison](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2008/n2637.pdf)
- [LWG Issue 1406. Support hashing smart-pointers based on owner](http://www.open-std.org/jtc1/sc22/wg21/docs/lwg-closed.html#1406)

