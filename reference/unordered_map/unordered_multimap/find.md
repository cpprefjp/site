#find (C++11)
```cpp
iterator find ( const key_type& k );
const_iterator find ( const key_type& k ) const;
```

##概要
コンテナ内でキーが `x` である要素を検索し、見つかった場合はそれへのイテレータを返し、見つからなかった場合は [`end`](end.md) （コンテナの最後の要素の次）を指すイテレータを返す。  
キーが `x`である要素の範囲を取得するには [`equal_range`](equal_range.md)を用いる。  
また、キーが `x` である要素が存在するかを調べる場合は [`count`](count.md) を用いる。


##パラメータ
- `x` : 検索するキー。`key_type` は `map` コンテナの中で `Key` の別名として定義される。ここで `Key` は 1 番目のテンプレートパラメータである。


##戻り値
指定した値が見つかった場合はその要素へのイテレータ、そうでない場合は [`end`](end.md) へのイテレータ。


##例外
投げない。


##計算量
平均： 定数時間  
最悪： [`size`](size.md) について線形時間。


##例
```cpp
#include <iostream>
#include <unordered_map>

int main()
{
  std::unordered_multimap<int,char> c;

  c.insert(std::make_pair(1,'a'));

  std::cout << (c.find(1) != c.end()) << std::endl;
  std::cout << (c.find(2) != c.end()) << std::endl;

  return(0);
}
```

###出力
```
1
0
```


##バージョン
###言語
- C++11

###処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [GCC, C++11 mode](/implementation.md#gcc): ??
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??, 11.0

##参照

| 名前                            | 説明                                     |
|---------------------------------|------------------------------------------|
| [`count`](count.md)             | 指定したキーにマッチする要素の数を返す   |
| [`equal_range`](equal_range.md) | 指定したキーにマッチする要素の範囲を返す |


