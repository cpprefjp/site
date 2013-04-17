#unordered_set
<code style='color:black'><unordered_set></code> ヘッダは、キーが要素である非順序連想コンテナを提供する。

<code style='color:black'><[set](/reference/set.md)></code> と異なり、各要素はキーの順序ではなくキーのハッシュ値に基づいて格納されるため、イテレータを用いたコンテナの走査の順序は（名前の通り）有意ではない。

<code style='color:black'><unordered_set></code> ヘッダで提供されるコンテナは、<code style='color:black'>operator==</code> と <code style='color:black'>operator!=</code> を除いてコンテナとしての要件を満たす。

<code style='color:black'>operator==</code> と <code style='color:black'>operator!=</code> も、コンテナの要素が一致する（あるいは一致しない）という点では他のコンテナ同様の意味を持つが、上記のとおりイテレータでの走査順が有意でないため、他のコンテナと同一のセマンティクスで（<code style='color:black'>std::[equal](/reference/algorithm/equal.md)</code> を用いて）定義することはできない。

<code style='color:black'><unordered_set></code> ヘッダでは、キーの重複を許さない <code style='color:black'>std::[unordered_set](./unordered_set/unordered_set.md)</code> クラステンプレート、およびキーの重複を許す <code style='color:black'>std::[unordered_multiset](./unordered_set/unordered_multiset.md)</code> クラステンプレートを提供する。



| | |
|-----------------------------------------------------------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------|
| <code style='color:black'>[unordered_set](./unordered_set/unordered_set.md)</code> | キーの重複を許さない非順序連想コンテナ(class template) |
| <code style='color:black'>[unordered_multiset](./unordered_set/unordered_multiset.md)</code> | キーの重複を許す非順序連想コンテナ(class template) |


```cpp
<pre style='margin:0'><code style='color:black'>#include <initializer_list>

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
}</pre>
```
* initializer_list[link /reference/initializer_list.md]

##バージョン


###言語

- C++11