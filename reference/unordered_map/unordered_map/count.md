#count (C++11)
* unordered_map[meta header]
* std[meta namespace]
* unordered_map[meta class]

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
平均： O(`count(k)`)  
最悪： [`size`](size.md) について線形時間。


##例
```cpp
#include <iostream>
#include <unordered_map>

int main()
{
  std::unordered_map<int, char> c;
  c[4] = 'D';

  std::cout << c.count(0) << std::endl;
  std::cout << c.count(4) << std::endl;

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
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [GCC, C++11 mode](/implementation.md#gcc): ??
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??, 11.0


##参照
- [LWG Issue 2304. Complexity of `count` in unordered associative containers](http://www.open-std.org/jtc1/sc22/wg21/docs/lwg-defects.html#2304)


##関連項目

| 名前              | 説明                     |
|-------------------|--------------------------|
| [`find`](find.md) | 指定したキーで要素を探す |
| [`size`](size.md) | 要素数を取得する         |
