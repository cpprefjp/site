# hexfloat
* ios[meta header]
* std[meta namespace]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  ios_base& hexfloat(ios_base& str);
}
```

## 概要
浮動小数点数を十六進法で入出力することを指示するマニピュレータ。

[`printf()`](https://web.archive.org/web/20230605132525/https://linuxjm.osdn.jp/html/LDP_man-pages/man3/printf.3.html)関数の`%a`／`%A`相当。

## 効果
`str.setf(ios_base::fixed | ios_base::scientific, ios_base::floatfield)`を実行する。

## 戻り値
実引数の`str`オブジェクト。

## 例
[`defaultfloat`](defaultfloat.md)を参照。

## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): 3.0 [mark verified]
- [GCC](/implementation.md#gcc): 5.0 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): 2008 [mark verified], 2010 [mark verified], 2012 [mark verified]


#### 備考
- GCCは12.0時点で、入力ストリームでの`hexfloat`の使用に対応していない。使用すると値0が入力される (エラーにならない)
    - [Bug 81122 - [DR 2381] parsing f stopped after '0' when reading `std::hexfloat >> f;`](https://gcc.gnu.org/bugzilla/show_bug.cgi?id=81122)


## 参照
- [`defaultfloat`](defaultfloat.md)
- [`fixed`](fixed.md)
- [`scientific`](scientific.md)
- [N1503 Proposed Additions to TR-1 to Improve Compatibility with C99](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2003/n1503.htm)

