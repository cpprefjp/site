# do_grouping
* locale[meta header]
* std[meta namespace]
* numpunct[meta class]
* function[meta id-type]

```cpp
protected:
  virtual string do_grouping() const; // (1) C++98
```
* string[link /reference/string/basic_string.md]

## 概要
何桁で区切るかの、桁数のシーケンスを取得する。[`grouping()`](grouping.md)から呼び出される仮想関数である。


## 戻り値
整数値のベクタとして使用される[`string`](/reference/string/basic_string.md)オブジェクト`vec`を返す。各要素`vec[i]`は、位置`i`のグループに含まれる桁数を表す。位置`0`が最も右のグループである。

- `vec.size() <= i`である場合、桁数はグループ`(i - 1)`と同じである
- `i < 0 || vec[i] <= 0 || vec[i] == CHAR_MAX`である場合、その桁グループのサイズは無制限である

規格が要求する特殊化（`numpunct<char>`と`numpunct<wchar_t>`）は、桁区切りを行わないことを示す空文字列を返す。


## 備考
戻り値の各要素は文字ではなく数値として解釈される。3桁ごとの区切りを表す場合、`"3"`ではなく`"\003"`を返す必要がある（`'3'`のASCII値は51であるため、`"3"`は51桁ごとの区切りを意味してしまう）。

## バージョン
### 言語
- C++98


## 関連項目
- [`numpunct::grouping`](grouping.md)
