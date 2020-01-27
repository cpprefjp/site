# unordered_map
* unordered_map[meta header]
* cpp11[meta cpp]

`<unordered_map>` ヘッダは、�ーと値のペアが要素である非順序連想コンテナを提供する。

[`<map>`](/reference/map.md) と異なり、各要素は�ーの順序ではなく�ーのハッシュ値に基づいて格納されるため、イテレータを用いたコンテナの走査の順序は（名前の通り）有意ではない。

`<unordered_map>` ヘッダで提供されるコンテナは、`operator==` と `operator!=` を除いてコンテナとしての要件を満たす。

`operator==` と `operator!=` も、コンテナの要素が一致する（あるいは一致しない）という点では他のコンテナ同様の意味を持つが、上記のとおりイテレータでの走査順が有意でないため、他のコンテナと同一のセマンティクスで（`std::`[`equal`](/reference/algorithm/equal.md) を用いて）定義することはできない。

`<unordered_map>` ヘッダでは、�ーの重複を許さない `std::`[`unordered_map`](unordered_map/unordered_map.md) クラステンプレート、および�ーの重複を許す `std::`[`unordered_multimap`](unordered_map/unordered_multimap.md) クラステンプレートを提供する。

このヘッダでは、以下の標準ヘッダをインクルードする：

- [`<initializer_list>`](initializer_list.md)


| 名前 | 説明 | 対応バージョン |
|---------------------------------------------------------------|--------------------------------------------------------|-------|
| [`unordered_map`](unordered_map/unordered_map.md)           | �ーの重複を許さない非順序連想コンテナ(class template) | C++11 |
| [`unordered_multimap`](unordered_map/unordered_multimap.md) | �ーの重複を許す非順序連想コンテナ(class template)     | C++11 |


```cpp
#include <initializer_list>

namespace std {
  // クラステンプレート unordered_map
  template <class Key,
            class T,
            class Hash = std::hash<Key>,
            class Pred = std::equal_to<Key>,
            class Allocator = std::allocator<std::pair<const Key, T> > >
    class unordered_map;

  // クラステンプレート unordered_multimap
  template <class Key,
            class T,
            class Hash = std::hash<Key>,
            class Pred = std::equal_to<Key>,
            class Allocator = std::allocator<std::pair<const Key, T> > >
    class unordered_multimap;

  template <class Key, class T, class Hash, class Pred, class Allocator>
    void swap(unordered_map<Key, T, Hash, Pred, Allocator>& x,
              unordered_map<Key, T, Hash, Pred, Allocator>& y);

  template <class Key, class T, class Hash, class Pred, class Allocator>
    void swap(unordered_multimap<Key, T, Hash, Pred, Allocator>& x,
              unordered_multimap<Key, T, Hash, Pred, Allocator>& y);

  template <class Key, class T, class Hash, class Pred, class Allocator>
    bool operator==(const unordered_map<Key, T, Hash, Pred, Allocator>& a,
                    const unordered_map<Key, T, Hash, Pred, Allocator>& b);
  template <class Key, class T, class Hash, class Pred, class Allocator>
    bool operator!=(const unordered_map<Key, T, Hash, Pred, Allocator>& a,
                    const unordered_map<Key, T, Hash, Pred, Allocator>& b);

  template <class Key, class T, class Hash, class Pred, class Allocator>
    bool operator==(const unordered_multimap<Key, T, Hash, Pred, Allocator>& a,
                    const unordered_multimap<Key, T, Hash, Pred, Allocator>& b);
  template <class Key, class Hash, class Pred, class Allocator>
    bool operator!=(const unordered_multimap<Key, T, Hash, Pred, Allocator>& a,
                    const unordered_multimap<Key, T, Hash, Pred, Allocator>& b);
}
```
* std::hash[link /reference/functional/hash.md]
* std::equal_to[link /reference/functional/equal_to.md]
* std::allocator[link /reference/memory/allocator.md]

## バージョン
### 言語
- C++11


## 参照
- [クソザコ鳥�が非順序連想コンテナに入門してみた](http://www.slideshare.net/kariya_mitsuru/ss-55842496)  
	[Boost.勉強会 #19 東京](https://boostjp.github.io/study_meeting/study19.html)で使用した非順序連想コンテナの入門資料
- [N2930 Range-Based For Loop Wording (Without Concepts)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2009/n2930.html)
