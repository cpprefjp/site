#equal_range (C++11)
* unordered_map[meta header]

```cpp
pair<iterator,iterator> equal_range(const key_type& x);
pair<const_iterator,const_iterator> equal_range(const key_type& x) const;
```

##概要
コンテナ内の、`x` と等しい全てのキー要素を含む範囲の境界を返す。`unordered_map` コンテナではキーの重複は無いため、この範囲は最大一つの要素を含む。 

もし `x` がコンテナ内のどのキーともマッチしなかった場合、戻り値の範囲は長さ 0 になり、両方のイテレータは `x` より大きく最も近い値を指す。そうでない場合、`x` がコンテナ内の全ての要素よりも大きい場合は [`end`](end.md) を指す。


##パラメータ
- `x` : 比較されるキー値。`key_type` はメンバ型であり、`map` コンテナ内で `Key` の別名として定義される。ここで `Key` は最初のテンプレートパラメータである。


##戻り値
`pair` を返す。
`pair::first` は 範囲の下境界にあたり、
`pair::second` は 範囲の上境界にあたる。
`iterator` はメンバ型であり `map` において双方向イテレータとして定義される。


##計算量
平均： 定数時間  
最悪： [`size`](size.md) について線形時間。


##例
```cpp
#include <iostream>
#include <unordered_map>

int main()
{
  std::unordered_map<int,char> c;

  c.insert(std::make_pair(1,'a'));
  c.insert(std::make_pair(2,'b'));
  c.insert(std::make_pair(3,'c'));
  c.insert(std::make_pair(4,'d'));
  c.insert(std::make_pair(5,'e'));

  typedef std::unordered_map<int,char>::iterator it_t;
  std::pair<it_t, it_t> ret = c.equal_range(3);

  std::cout << "low: " << ret.first->first << " " << ret.first->second << std::endl;
  std::cout << "up: " << ret.second->first << " " << ret.second->second << std::endl;

  std::pair<it_t, it_t> ret2 = c.equal_range(0);
  std::cout << "low:" << ( ret2.first == c.end() )  << std::endl;
  std::cout << "up:" << ( ret2.second == c.end() )  << std::endl;

  return(0);
}
```

###出力
```
low: 3 c
up: 4 d
low:1
up:1
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


| 名前 | 説明 |
|-------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------|
| [`count`](count.md) | 指定したキーにマッチする要素の数を返す |
| [`find`](find.md) | 指定したキーで要素を探す |


