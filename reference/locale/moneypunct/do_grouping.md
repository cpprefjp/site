# do_grouping
* locale[meta header]
* std[meta namespace]
* moneypunct[meta class]
* function[meta id-type]

```cpp
protected:
  virtual string do_grouping() const; // (1) C++98
```
* string[link /reference/string/basic_string.md]

## 概要
何桁で区切るかの、桁数のシーケンスを取得する。[`grouping()`](grouping.md)から呼び出される仮想関数である。


## 戻り値
[`numpunct::do_grouping()`](/reference/locale/numpunct/do_grouping.md)と同一に定義されるパターンを返す（値が等しいとは限らない）。

3桁ごとの区切りを指定する場合、値は`"3"`ではなく`"\003"`である。

## バージョン
### 言語
- C++98


## 関連項目
- [`moneypunct::grouping`](grouping.md)
