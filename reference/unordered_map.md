#unordered_map
<code style='color:black'><unordered_map></code> ヘッダは、キーと値のペアが要素である非順序連想コンテナを提供する。

<code style='color:black'><[map](/site/cpprefjp/reference/map)></code> と異なり、各要素はキーの順序ではなくキーのハッシュ値に基づいて格納されるため、イテレータを用いたコンテナの走査の順序は（名前の通り）有意ではない。

<code style='color:black'><unordered_map></code> ヘッダで提供されるコンテナは、<code style='color:black'>operator==</code> と <code style='color:black'>operator!=</code> を除いてコンテナとしての要件を満たす。

<code style='color:black'>operator==</code> と <code style='color:black'>operator!=</code> も、コンテナの要素が一致する（あるいは一致しない）という点では他のコンテナ同様の意味を持つが、上記のとおりイテレータでの走査順が有意でないため、他のコンテナと同一のセマンティクスで（<code style='color:black'>std::[equal](/reference/algorithm/equal.md)</code> を用いて）定義することはできない。

<code style='color:black'><unordered_map></code> ヘッダでは、キーの重複を許さない <code style='color:black'>std::[unordered_map](./unordered_map/unordered_map.md)</code> クラステンプレート、およびキーの重複を許す <code style='color:black'>std::[unordered_multimap](./unordered_map/unordered_multimap.md)</code> クラステンプレートを提供する。



| | |
|-----------------------------------------------------------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------|
| <code style='color:black'>[unordered_map](./unordered_map/unordered_map.md)</code> | キーの重複を許さない非順序連想コンテナ(class template) |
| <code style='color:black'>[unordered_multimap](./unordered_map/unordered_multimap.md)</code> | キーの重複を許す非順序連想コンテナ(class template) |


```cpp
<pre style='margin:0'><code style='color:black'>#include <initializer_list>

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
}</pre>
```
* initializer_list[link /reference/initializer_list.md]
* pair[link /reference/utility/pair.md]

##バージョン


###言語

- C++11