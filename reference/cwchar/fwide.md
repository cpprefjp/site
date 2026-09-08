# fwide
* cwchar[meta header]
* std[meta namespace]
* function[meta id-type]

```cpp
namespace std {
  int fwide(FILE* stream, int mode);
}
```
* FILE[link /reference/cstdio/file.md]

## 概要
ストリームの入出力の単位（ワイド文字／マルチバイト文字）を設定・取得する。


## 戻り値
ストリームの単位が確定した後の状態を返す。

| 戻り値 | 意味 |
|--------|------|
| 正の値 | ワイド文字単位 |
| `0` | どちらにも確定していない |
| 負の値 | マルチバイト文字単位 |


## 備考
- `mode`が正の値であればワイド文字単位、負の値であればマルチバイト文字単位に設定しようとする。`0`の場合は設定を行わず、現在の状態を取得するだけとなる
- ストリームの単位は、最初の入出力操作か、この関数の呼び出しによって一度だけ確定する。確定した後は、この関数で変更できない
- 確定した単位と異なる入出力操作を行った場合、動作は未定義である


## 例
```cpp example
#include <cwchar>
#include <cstdio>
#include <iostream>

int main()
{
  std::FILE* fp = std::fopen("test.txt", "w");

  // 未確定の状態
  std::wcout << std::fwide(fp, 0) << std::endl;

  // ワイド文字単位に設定する
  std::wcout << (std::fwide(fp, 1) > 0) << std::endl;

  std::fclose(fp);
}
```
* std::fwide[color ff0000]
* std::wcout[link /reference/iostream/wcout.md]

### 出力
```
0
1
```


## バージョン
### 言語
- C++98


## 関連項目
- [`fputwc`](fputwc.md)
- [`fgetwc`](fgetwc.md)
