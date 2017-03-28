# unordered_set
* unordered_set[meta header]
* cpp11[meta cpp]

`<unordered_set>` ヘッダは、キーが要素である非順序連想コンテナを提供する。

[`<set>`](/reference/set.md) と異なり、各要素はキーの順序ではなくキーのハッシュ値に基づいて格納されるため、イテレータを用いたコンテナの走査の順序は（名前の通り）有意ではない。

`<unordered_set>` ヘッダで提供されるコンテナは、`operator==` と `operator!=` を除いてコンテナとしての要件を満たす。

`operator==` と `operator!=` も、コンテナの要素が一致する（あるいは一致しない）という点では他のコンテナ同様の意味を持つが、上記のとおりイテレータでの走査順が有意でないため、他のコンテナと同一のセマンティクスで（`std::`[`equal`](/reference/algorithm/equal.md) を用いて）定義することはできない。

`<unordered_set>` ヘッダでは、キーの重複を許さない `std::`[`unordered_set`](unordered_set/unordered_set.md) クラステンプレート、およびキーの重複を許す `std::`[`unordered_multiset`](unordered_set/unordered_multiset.md) クラステンプレートを提供する。


| 名前 | 説明 | 対応バージョン |
|---------------------------------------------------------------|--------------------------------------------------------|-------|
| [`unordered_set`](unordered_set/unordered_set.md)           | キーの重複を許さない非順序連想コンテナ(class template) | C++11 |
| [`unordered_multiset`](unordered_set/unordered_multiset.md) | キーの重複を許す非順序連想コンテナ(class template)     | C++11 |


```cpp
#include <initializer_list>

namespace std {
  // クラステンプレート unordered_set
  template <class Key,
            class Hash = std::hash<Key>,
            class Pred = std::equal_to<Key>,
            class Allocator = std::allocator<Key> >
    class unordered_set;

  // クラステンプレート unordered_multiset
  template <class Key,
            class Hash = std::hash<Key>,
            class Pred = std::equal_to<Key>,
            class Allocator = std::allocator<Key> >
    class unordered_multiset;

  template <class Key, class Hash, class Pred, class Allocator>
    void swap(unordered_set<Key, Hash, Pred, Allocator>& x,
              unordered_set<Key, Hash, Pred, Allocator>& y);

  template <class Key, class Hash, class Pred, class Allocator>
    void swap(unordered_multiset<Key, Hash, Pred, Allocator>& x,
              unordered_multiset<Key, Hash, Pred, Allocator>& y);

  template <class Key, class Hash, class Pred, class Allocator>
    bool operator==(const unordered_set<Key, Hash, Pred, Allocator>& a,
                    const unordered_set<Key, Hash, Pred, Allocator>& b);
  template <class Key, class Hash, class Pred, class Allocator>
    bool operator!=(const unordered_set<Key, Hash, Pred, Allocator>& a,
                    const unordered_set<Key, Hash, Pred, Allocator>& b);

  template <class Key, class Hash, class Pred, class Allocator>
    bool operator==(const unordered_multiset<Key, Hash, Pred, Allocator>& a,
                    const unordered_multiset<Key, Hash, Pred, Allocator>& b);
  template <class Key, class Hash, class Pred, class Allocator>
    bool operator!=(const unordered_multiset<Key, Hash, Pred, Allocator>& a,
                    const unordered_multiset<Key, Hash, Pred, Allocator>& b);
}
```
* std::hash[link /reference/functional/hash.md]
* std::equal_to[link /reference/functional/equal_to.md]
* std::allocator[link /reference/memory/allocator.md]

## バージョン
### 言語
- C++11


## 参照
- [クソザコ鳥頭が非順序連想コンテナに入門してみた](http://www.slideshare.net/kariya_mitsuru/ss-55842496)  
	[Boost.勉強会 #19 東京](https://boostjp.github.io/study_meeting/study19.html)で使用した非順序連想コンテナの入門資料
