# gcount
* istream[meta header]
* std[meta namespace]
* basic_istream[meta class]
* function[meta id-type]

```cpp
streamsize gcount();
```

## 概要
最後に実行した非書式化入力関数での入力文字数を取得する。

## 戻り値
最後に実行した非書式化関数での入力文字数。

入力文字数が[`streamsize`](/reference/ios/type-streamsize.md)で表現できる範囲を超える場合の扱いは、バージョンによって異なる。

- C++03 : 規定されていない
- C++23 : その文字数が[`numeric_limits`](/reference/limits/numeric_limits.md)`<`[`streamsize`](/reference/ios/type-streamsize.md)`>::`[`max()`](/reference/limits/numeric_limits/max.md)を超える場合は、[`numeric_limits`](/reference/limits/numeric_limits.md)`<`[`streamsize`](/reference/ios/type-streamsize.md)`>::`[`max()`](/reference/limits/numeric_limits/max.md)を返す

## 例
[`read`メンバ関数](read.md)の例を参照。

## バージョン
### 言語
- C++98

## 参照
- [LWG Issue 3464. `istream::gcount()` can overflow](https://cplusplus.github.io/LWG/issue3464)
    - C++23で、抽出文字数が[`streamsize`](/reference/ios/type-streamsize.md)で表現できない場合に[`numeric_limits`](/reference/limits/numeric_limits.md)`<streamsize>::max()`を返すことが規定された
