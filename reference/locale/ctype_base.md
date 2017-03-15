# ctype_base
* locale[meta header]
* std[meta namespace]
* class[meta id-type]

```cpp
namespace std {
  class ctype_base;
}
```

## 概要
(ここに、クラスの概要を記載する)

### メンバ型

| | |
|-------------------|--------------------------------|
| `mask` | ビットマスクの整数型 |

### メンバ定数

| | |
|-------------------------------------------------------|-----------------------------------|
| `static const mask space = 1 << 0;` | 空白類文字のマスク値 |
| `static const mask print = 1 << 1;` | 印字可能文字のマスク値 |
| `static const mask cntrl = 1 << 2;` | 制御文字のマスク値 |
| `static const mask upper = 1 << 3;` | 英大文字のマスク値 |
| `static const mask lower = 1 << 4;` | 英小文字のマスク値 |
| `static const mask alpha = 1 << 5;` | 英字のマスク値 |
| `static const mask digit = 1 << 6;` | 数字のマスク値 |
| `static const mask punct = 1 << 7;` | 区切り文字のマスク値 |
| `static const mask xdigit = 1 << 8;` | 十六進数字のマスク値 |
| `static const mask blank = 1 << 9;` | ブランク文字のマスク値 |
| <code>static const mask alnum = alpha &#x7C; digit;</code> | 英字・数字のマスク値 |
| <code>static const mask graph = alnum &#x7C; punct;</code> | 図形文字のマスク値 |


## 例
```cpp
```

### 出力
```
```

### 参照
