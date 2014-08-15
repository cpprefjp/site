#find (C++11)
```cpp
iterator find(const key_type& x);
const_iterator find(const key_type& x) const;
```

##概要
コンテナ内でキーが `x` である要素を検索し、見つかった場合はそれへのイテレータを返し、見つからなかった場合は [`end`](/reference/unordered_map/end.md) （コンテナの最後の要素の次）を指すイテレータを返す。


##パラメータ
- `x` : 検索するキー。`key_type` は `map` コンテナの中で `Key` の別名として定義される。ここで `Key` は 1 番目のテンプレートパラメータである。


##戻り値
指定した値が見つかった場合はその要素へのイテレータ、そうでない場合は [`end`](/reference/unordered_map/end.md) へのイテレータ。


##例外
投げない。


##計算量
平均： 定数時間  
最悪： [`size`](/reference/unordered_map/size.md) について線形時間。


##例
```cpp
#include <iostream>
#include <unordered_map>

using namespace std;

int main() 
{
  unordered_map<int, char> c;

  c.insert(std::make_pair(1,'a'));

  cout << (c.find(1) != c.end()) << endl;
  cout << (c.find(2) != c.end()) << endl;

  return 0;
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

| 名前 | 説明|
|-------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------|
| [`count`](/reference/unordered_map/count.md) | 指定したキーにマッチする要素の数を返す |


