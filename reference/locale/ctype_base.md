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

| 名前 | 説明 |
|-------------------|--------------------------------|
| `mask` | ビットマスクの整数型 |

### メンバ定数

| 名前 | 説明 | 対応バージョン |
|-------------------------------------------------------|-----------------------------------|-------|
| `static const mask space = 1 << 0;`<br/>`static constexpr mask space = 1 << 0;` | 空白類文字のマスク値 | C++98<br/>C++26 |
| `static const mask print = 1 << 1;`<br/>`static constexpr mask print = 1 << 1;` | 印字可能文字のマスク値 | C++98<br/>C++26 |
| `static const mask cntrl = 1 << 2;`<br/>`static constexpr mask cntrl = 1 << 2;` | 制御文字のマスク値 | C++98<br/>C++26 |
| `static const mask upper = 1 << 3;`<br/>`static constexpr mask upper = 1 << 3;` | 英大文字のマスク値 | C++98<br/>C++26 |
| `static const mask lower = 1 << 4;`<br/>`static constexpr mask lower = 1 << 4;` | 英小文字のマスク値 | C++98<br/>C++26 |
| `static const mask alpha = 1 << 5;`<br/>`static constexpr mask alpha = 1 << 5;` | 英字のマスク値 | C++98<br/>C++26 |
| `static const mask digit = 1 << 6;`<br/>`static constexpr mask digit = 1 << 6;` | 数字のマスク値 | C++98<br/>C++26 |
| `static const mask punct = 1 << 7;`<br/>`static constexpr mask punct = 1 << 7;` | 区切り文字のマスク値 | C++98<br/>C++26 |
| `static const mask xdigit = 1 << 8;`<br/>`static constexpr mask xdigit = 1 << 8;` | 十六進数字のマスク値 | C++98<br/>C++26 |
| `static const mask blank = 1 << 9;`<br/>`static constexpr mask blank = 1 << 9;` | ブランク文字のマスク値 | C++11<br/>C++26 |
| <code>static const mask alnum = alpha &#x7C; digit;</code><br/><code>static constexpr mask alnum = alpha &#x7C; digit;</code> | 英字・数字のマスク値 | C++98<br/>C++26 |
| <code>static const mask graph = alnum &#x7C; punct;</code><br/><code>static constexpr mask graph = alnum &#x7C; punct;</code> | 図形文字のマスク値 | C++98<br/>C++26 |


## 例
```cpp
```

### 出力
```
```

## 参照
- [LWG Issue 4037. Static data members of `ctype_base` are not yet required to be usable in constant expressions](https://cplusplus.github.io/LWG/issue4037)
    - C++26で、各メンバ定数が`static const`から`static constexpr`に変更され、定数式で使用できることが規定された
