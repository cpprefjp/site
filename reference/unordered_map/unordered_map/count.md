#count (C++11)
```cpp
size_type count(const key_type& x) const;
```

##概要
キー `x` を検索し、コンテナ内に見つかった要素の数を返す。`map` コンテナはキーの重複を許さないため、この関数は実際には要素が見つかったときに 1 を、そうでないときに 0 を返す。


##パラメータ
- `x` : 検索するキー値。`key_type` はメンバ型であり、`map` コンテナの中で `Key` の別名として定義される。ここで `Key` は 1 番目のテンプレートパラメータである。


##戻り値
`x` と同じ値のキーが見つかったなら 1、そうでないなら 0。
メンバ型 `size_type` は符号なし整数型である。

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
  c[4] = 'D';

  cout << c.count(0) << endl;
  cout << c.count(4) << endl;

  return 0;
}
```

###出力
```
0
1
```


##バージョン
###言語
- C++11

###処理系
- [Clang](/implementation#clang.md): ??
- [GCC](/implementation#gcc.md): ??
- [GCC, C++11 mode](/implementation#gcc.md): ??
- [ICC](/implementation#icc.md): ??
- [Visual C++](/implementation#visual_cpp.md): ??, 11.0


##参照

| 名前 | 説明 |
|-------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------|
| [`find`](/reference/unordered_map/find.md) | 指定したキーで要素を探す |
| [`size`](/reference/unordered_map/size.md) | 要素数を取得する |


