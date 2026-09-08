# TMP_MAX
* cstdio[meta header]
* macro[meta id-type]

```cpp
#define TMP_MAX unspecified
```
* unspecified[italic]

## 概要
[`tmpnam()`](tmpnam.md)関数を繰り返し呼び出したときに、互いに異なるファイル名が生成されることが保証される最低限の回数を表す整数定数。

値は処理系定義であり、`25`以上であることが保証される。


## 例
```cpp example
#include <cstdio>

int main()
{
  // TMP_MAX回までは、互いに異なるファイル名が生成されることが保証される
  std::printf("%d\n", TMP_MAX >= 25);
}
```
* TMP_MAX[color ff0000]
* std::printf[link printf.md]

### 出力
```
1
```


## 関連項目
- [`tmpnam`](tmpnam.md)
- [`L_tmpnam`](l_tmpnam.md)
