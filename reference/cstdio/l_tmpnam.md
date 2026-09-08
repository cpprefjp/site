# L_tmpnam
* cstdio[meta header]
* macro[meta id-type]

```cpp
#define L_tmpnam unspecified
```
* unspecified[italic]

## 概要
[`tmpnam()`](tmpnam.md)関数が生成する一時ファイル名を保持するのに必要な、文字配列の長さを表す整数定数。

`tmpnam()`にバッファを渡す場合、そのバッファは`L_tmpnam`個以上の`char`の配列でなければならない。値は処理系定義である。


## 例
```cpp example
#include <cstdio>

int main()
{
  // tmpnam()に渡すバッファは、L_tmpnam要素以上でなければならない
  char name[L_tmpnam];
  std::tmpnam(name);

  std::printf("%d\n", name[0] != '\0');
}
```
* L_tmpnam[color ff0000]
* std::tmpnam[link tmpnam.md]
* std::printf[link printf.md]

### 出力
```
1
```


## 関連項目
- [`tmpnam`](tmpnam.md)
- [`TMP_MAX`](tmp_max.md)
