#find
* set[meta header]
* std[meta namespace]

```cpp
iterator find(const key_type& x);
const_iterator find(const key_type& x) const;
```

##概要
コンテナ内で値が `x` である要素を検索し、見つかった最初の要素へのイテレータを返し、見つからなかった場合は [`end()`](./end.md) （コンテナの最後の要素の次）を指すイテレータを返す。


##パラメータ
- `x` : 検索する値。`key_type` は `set` コンテナの中で `Key` の別名として定義される。ここで `Key` は 1 番目のテンプレートパラメータであり、コンテナに格納される要素の型である。


##戻り値
見つかった最初の要素へのイテレータ、そうでない場合は [`end()`](./end.md) へのイテレータ。`iterator` はメンバ型であり、`set` においては双方向イテレータとして定義される。


##計算量
[`size`](./size.md)`()` について対数時間。


##例
```cpp
#include <iostream>
#include <set>

int main()
{
  std::set<int> c;

  c.insert(10);

  std::cout << (c.find(10) != c.end()) << std::endl;
  std::cout << (c.find(42) != c.end()) << std::endl;
}
```
* iostream[link ../../iostream.md]
* set[link ../../set.md]
* insert[link insert.md]
* cout[link ../../iostream/cout.md]
* endl[link ../../ostream/endl.md]
* find[color ff0000]
* end[link end.md]

###出力
```
1
0
```

##参照

| 名前                              | 説明                                               |
|-----------------------------------|----------------------------------------------------|
| [`count`](./count.md)             | 指定したキーにマッチする要素の数を返す             |
| [`lower_bound`](./lower_bound.md) | 与えられた値より小さくない要素へのイテレータを返す |
| [`upper_bound`](./upper_bound.md) | 特定の値よりも大きい最初の要素へのイテレータを返す |
