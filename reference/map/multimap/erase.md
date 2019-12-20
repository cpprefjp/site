# erase
* map[meta header]
* std[meta namespace]
* multimap[meta class]
* function[meta id-type]

```cpp
void erase(iterator position);                             // (1) C++03
iterator erase(const_iterator position);                   // (1) C++11

size_type erase(const key_type& x);                        // (2)

void erase(iterator first, iterator last);                 // (3) C++03
iterator erase(const_iterator first, const_iterator last); // (3) C++11
```


## 概要
単一要素または要素範囲（`[first, last)`）を `multimap` コンテナから削除する。

これは削除された要素の数だけコンテナの `size` を減らし、それぞれの要素のデストラクタを呼び出す。


## パラメータ
- `position` : `multimap` から削除する単一要素を指すイテレータ。`iterator` はメンバ型であり、双方向イテレータとして定義される。
- `x` : `multimap` から削除される値のキー。`key_type` はメンバ型であり、`multimap` コンテナの中で `Key` の別名として定義される。ここで `Key` は 1 番目のテンプレートパラメータであり、コンテナに格納される要素のキーの型である。
- `first, last` : `multimap` コンテナ内の、削除される範囲 `[first, last)` を指定するイテレータ。ここでいう範囲は `first` と `last` の間の全ての要素を含み、`first` が指す要素を含むが `last` が指す要素は含まない。


## 戻り値
- (1), (3)
    - C++03 : 戻り値なし
    - C++11 : 削除された要素の次を指すイテレータを返す。そのような要素がない場合、[`end()`](end.md)を返す(コンテナが空になった場合や、最後尾の要素を削除した場合)。
- (2) 削除された要素の数を返す。


## 計算量
- (1) 定数時間。
- (2) コンテナの [`size()`](/reference/map/map/size.md) について対数時間。
- (3) コンテナの [`size()`](/reference/map/map/size.md) について対数時間、それに加えて `first` と `last` の間の距離に対する線形時間。


## 備考
- ループ中で `multimap` の要素を削除するためには、C++03 までは以下のようなコードを書く必要があった。
    ```cpp
    while (it != map_object.end()) {
      if (条件) {
        map_object.erase(it++);
      }
      else {
        ++it;
      }
    }
    ```

    - これは、`erase` で指定したイテレータが、対象となる要素が削除されることによって無効になるため、後置インクリメント `it++` を使用することで要素が削除されるより先に削除対象の次の要素を指すようにするためである。
    - このような書き方は C++11 以降でも依然として有効だが、`erase` が削除された次の要素を指すイテレータを返すようになったため、以下のようなコードを
    ```cpp
    map_object.erase(it++);
    ```

    - 以下のように書くこともできるようになった
    ```cpp
    it = map_object.erase(it);
    ```


## 例
### 基本的な使い方 (C++03)
```cpp example
#include <iostream>
#include <map>

int main()
{
  std::multimap<int, char> m;

  m.insert(std::make_pair(1, 'A'));
  m.insert(std::make_pair(2, 'B'));
  m.insert(std::make_pair(3, 'C'));
  std::cout << m.size() << std::endl;

  m.erase(1);
  std::cout << m.size() << std::endl;

  m.erase(5);
  std::cout << m.size() << std::endl;

  m.erase(m.begin(), m.end());
  std::cout << m.size() << std::endl;

  return 0;
}
```
* erase[color ff0000]
* m.insert[link insert.md]
* m.size()[link size.md]
* m.begin()[link begin.md]
* m.end()[link end.md]

#### 出力
```
3
2
2
0
```

### イテレート中に要素を削除する (C++11)
```cpp example
#include <iostream>
#include <map>

int main()
{
  std::multimap<int, char> m = {
    {3, 'a'},
    {1, 'b'},
    {4, 'c'}
  };

  // イテレート中に要素削除をするような場合には、
  // 範囲for文は使用できない
  for (auto it = m.begin(); it != m.end();) {
    // 条件一致した要素を削除する
    if (it->first == 1) {
      // 削除された要素の次を指すイテレータが返される。
      // C++03では、erase()の戻り値を使用せず、 m.erase(it++); のように書く
      it = m.erase(it);
    }
    // 要素削除をしない場合に、イテレータを進める
    else {
      ++it;
    }
  }

  for (const auto& x : m) {
    std::cout << x.first << ':' << x.second << std::endl;
  }
}
```

#### 出力
```
3:a
4:c
```


## 関連項目

| 名前 | 説明|
|---------------------------------------------------------------------------------------|--------------------------------------|
| [`multimap::clear`](/reference/map/multimap/clear.md) | 全ての要素を削除する |
| [`multimap::insert`](/reference/map/multimap/insert.md) | 要素を挿入する |
| [`multimap::find`](/reference/map/multimap/find.md) | 指定したキーで要素を探す |


## 参照
- [N2350 Container insert/erase and iterator constness (Revision 1)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2007/n2350.pdf)
- [LWG Issue 2258. `a.erase(q1, q2)` unable to directly return `q2`](http://www.open-std.org/jtc1/sc22/wg21/docs/lwg-defects.html#2258)
    - C++11では、「`a.erase(q1, q2)`の結果として`q2`が返る」という仕様だったが、`const_iterator`型が渡された場合に`iterator`型を返せない問題があった。そのためC++14では、`q2`が指す要素を指すイテレータが返る、ということが明記された


