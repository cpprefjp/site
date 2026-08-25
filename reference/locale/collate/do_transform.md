# do_transform
* locale[meta header]
* std[meta namespace]
* collate[meta class]
* function[meta id-type]

```cpp
protected:
  virtual string_type
    do_transform(const charT* low, const charT* high) const; // (1) C++98
```

## 概要
文字の範囲を、照合順序での比較に使用できる文字列へ変換する。[`transform()`](transform.md)から呼び出される仮想関数である。


## 戻り値
[`std::basic_string`](/reference/string/basic_string.md)`<charT>`の値。この値を、別の文字列に対して[`transform()`](transform.md)を呼び出した結果と辞書順で比較すると、それら2つの文字列に対して[`do_compare()`](do_compare.md)を呼び出した場合と同じ結果になる。

## バージョン
### 言語
- C++98


## 関連項目
- [`collate::transform`](transform.md)
- [`collate::do_compare`](do_compare.md)
