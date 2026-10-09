# コンテナとは

## 概要
「コンテナ (container)」とは、C++標準ライブラリにおけるデータ構造の名称である。要素となるオブジェクトを保持し、その追加・参照・削除・列挙といった操作を提供する。どの操作を提供するかは、コンテナの種類によって異なる。

標準ライブラリのコンテナは、要素をどのように保持し、どのように目的の要素を見つけるかによって、シーケンスコンテナ・連想コンテナ・コンテナアダプタに分類される。どのコンテナも要素を所有し、コンテナを破棄すると保持している要素も破棄される。

なお、[`std::span`](/reference/span/span.md)や[`std::mdspan`](/reference/mdspan/mdspan.md)は、ほかの場所にある要素列を参照するだけで要素を所有しないため、コンテナではない。また[`std::basic_string`](/reference/string/basic_string.md)は文字のシーケンスを保持し、シーケンスコンテナと同様に扱えるが、文字列を扱うクラスとして別に規定されている。


### シーケンスコンテナ
「シーケンスコンテナ (sequence container)」は、要素を一列に並べて保持する。要素を追加する位置を指定でき、要素の並び順はその位置によって決まる。

| 名前                                                             | 説明                               | 対応バージョン |
|------------------------------------------------------------------|------------------------------------|----------------|
| [`array`](/reference/array/array.md)                             | 固定長の配列                       | C++11          |
| [`vector`](/reference/vector/vector.md)                          | 可変長の配列                       |                |
| [`inplace_vector`](/reference/inplace_vector/inplace_vector.md)  | 容量が固定された可変長の配列       | C++26          |
| [`deque`](/reference/deque/deque.md)                             | 両端キュー                         |                |
| [`list`](/reference/list/list.md)                                | 双方向リンクリスト                 |                |
| [`forward_list`](/reference/forward_list/forward_list.md)        | 単方向リンクリスト                 | C++11          |
| [`hive`](/reference/hive/hive.md)                                | 要素のメモリ位置が安定したコンテナ | C++26          |

ただし[`std::array`](/reference/array/array.md)は要素数が固定されており、要素の追加・削除を行えない。[`std::hive`](/reference/hive/hive.md)は挿入位置をコンテナが決定するため、要素の順序は未規定である。


### 連想コンテナ
「連想コンテナ (associative container)」は、キーから要素を探せるように要素を保持する。キーの比較によって順序付けて保持するものと、キーのハッシュ値によって分類して保持するもの (非順序連想コンテナ) がある。

| 名前                                                                    | 説明                                   | 対応バージョン |
|-------------------------------------------------------------------------|----------------------------------------|----------------|
| [`map`](/reference/map/map.md)                                          | 順序付き連想配列                       |                |
| [`multimap`](/reference/map/multimap.md)                                | キーの重複を許す順序付き連想配列       |                |
| [`set`](/reference/set/set.md)                                          | 順序付き集合                           |                |
| [`multiset`](/reference/set/multiset.md)                                | 要素の重複を許す順序付き集合           |                |
| [`unordered_map`](/reference/unordered_map/unordered_map.md)            | 非順序連想配列                         | C++11          |
| [`unordered_multimap`](/reference/unordered_map/unordered_multimap.md)  | キーの重複を許す非順序連想配列         | C++11          |
| [`unordered_set`](/reference/unordered_set/unordered_set.md)            | 非順序集合                             | C++11          |
| [`unordered_multiset`](/reference/unordered_set/unordered_multiset.md)  | 要素の重複を許す非順序集合             | C++11          |

連想配列はキーと値の組を要素として保持し、集合はキーそのものを要素として保持する。


### コンテナアダプタ
「コンテナアダプタ (container adaptor)」は、ほかのコンテナを内部に保持し、それを別のデータ構造として見せる。

| 名前                                                          | 説明                                                   | 対応バージョン |
|---------------------------------------------------------------|--------------------------------------------------------|----------------|
| [`stack`](/reference/stack/stack.md)                          | LIFOスタック                                           |                |
| [`queue`](/reference/queue/queue.md)                          | FIFOキュー                                             |                |
| [`priority_queue`](/reference/queue/priority_queue.md)        | 優先順位付きキュー                                     |                |
| [`flat_map`](/reference/flat_map/flat_map.md)                 | ソート済みのシーケンスによる順序付き連想配列           | C++23          |
| [`flat_multimap`](/reference/flat_map/flat_multimap.md)       | ソート済みのシーケンスによるキーの重複を許す順序付き連想配列 | C++23     |
| [`flat_set`](/reference/flat_set/flat_set.md)                 | ソート済みのシーケンスによる順序付き集合               | C++23          |
| [`flat_multiset`](/reference/flat_set/flat_multiset.md)       | ソート済みのシーケンスによる要素の重複を許す順序付き集合 | C++23         |

[`std::stack`](/reference/stack/stack.md)・[`std::queue`](/reference/queue/queue.md)・[`std::priority_queue`](/reference/queue/priority_queue.md)は、提供する操作を限定することで用途を明確にする。そのため、これらのコンテナは要素を列挙する操作を提供しない。`flat_`で始まるコンテナは、ソート済みのシーケンスを内部に保持することで、連想コンテナと同じ操作を提供する。


## 例
ここでは、シーケンスコンテナと連想コンテナを例として、基本的な操作を示す。

### 要素を追加する
シーケンスコンテナは要素を追加する位置を指定し、連想配列はキーと値の組を追加する。どちらも、範囲for文で全要素を列挙できる。

```cpp example
#include <iostream>
#include <vector>
#include <map>
#include <string>

int main()
{
  // シーケンスコンテナ : 末尾に要素を追加する
  std::vector<int> v;
  v.push_back(1);
  v.push_back(3);

  // シーケンスコンテナ : 位置を指定して要素を挿入する
  // ここでは、先頭から1要素進んだ位置に2を挿入する
  v.insert(v.begin() + 1, 2);

  for (int x : v) {
    std::cout << x << std::endl;
  }

  // 連想コンテナ : キーと値の組を追加する
  std::map<std::string, int> m;
  m.insert({"one", 1});
  m["two"] = 2;

  for (const auto& [key, value] : m) {
    std::cout << key << " : " << value << std::endl;
  }
}
```
* v.push_back[link /reference/vector/vector/push_back.md]
* v.insert[link /reference/vector/vector/insert.md]
* m.insert[link /reference/map/map/insert.md]
* m["two"][link /reference/map/map/op_at.md]

#### 出力
```
1
2
3
one : 1
two : 2
```

[`std::map`](/reference/map/map.md)は、キーの順序で要素を保持するため、列挙する順序は追加した順序ではなくキーの昇順となる。


### 要素を参照する
要素を参照する方法は、コンテナがどのように要素を保持しているかによって異なる。

```cpp example
#include <iostream>
#include <iterator>
#include <vector>
#include <list>
#include <map>
#include <string>

int main()
{
  std::vector<int> v = {1, 2, 3};
  std::list<int> ls = {1, 2, 3};
  std::map<std::string, int> m = {{"one", 1}, {"two", 2}};

  // vectorは、位置を添字で指定して参照できる
  std::cout << v[1] << std::endl;

  // listは添字で指定できないため、イテレータを進めて位置を指定する
  std::cout << *std::next(ls.begin(), 1) << std::endl;

  // mapは、キーを指定して値を参照する
  std::cout << m.at("two") << std::endl;
}
```
* v[1][link /reference/vector/vector/op_at.md]
* ls.begin()[link /reference/list/list/begin.md]
* m.at[link /reference/map/map/at.md]

#### 出力
```
2
2
2
```

[`std::vector`](/reference/vector/vector.md)は要素を連続した領域に並べて保持するため、どの位置の要素も定数時間で参照できる。[`std::list`](/reference/list/list.md)は要素どうしをリンクでつないで保持するため、先頭から順にイテレータを進める必要があり、位置に比例した時間がかかる。


### 要素を削除する
シーケンスコンテナは削除する要素の位置をイテレータで指定し、連想コンテナはキーを指定できる。

```cpp example
#include <iostream>
#include <iterator>
#include <vector>
#include <list>
#include <map>
#include <string>

int main()
{
  std::vector<int> v = {1, 2, 3};
  std::list<int> ls = {1, 2, 3};
  std::map<std::string, int> m = {{"one", 1}, {"two", 2}};

  // シーケンスコンテナは、削除する要素の位置をイテレータで指定する
  v.erase(v.begin() + 1);
  ls.erase(std::next(ls.begin(), 1));

  // 連想コンテナは、削除する要素のキーを指定できる
  m.erase("two");

  for (int x : v) {
    std::cout << x << std::endl;
  }
  for (int x : ls) {
    std::cout << x << std::endl;
  }
  for (const auto& [key, value] : m) {
    std::cout << key << " : " << value << std::endl;
  }
}
```
* v.erase[link /reference/vector/vector/erase.md]
* ls.erase[link /reference/list/list/erase.md]
* ls.begin()[link /reference/list/list/begin.md]
* m.erase[link /reference/map/map/erase.md]

#### 出力
```
1
3
1
3
one : 1
```


## 関連項目
- [イテレータとは](iterator.md.nolink)
- [各種コンテナの特徴比較](container_comparison.md.nolink)
