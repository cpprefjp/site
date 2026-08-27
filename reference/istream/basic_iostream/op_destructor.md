# デストラクタ
* istream[meta header]
* std[meta namespace]
* basic_iostream[meta class]
* function[meta id-type]

```cpp
virtual ~basic_iostream(); // (1) C++98
```
* basic_iostream[link ../basic_iostream.md]


## 概要
入出力ストリームオブジェクトを破棄する。


## 備考
[`rdbuf`](../../ios/basic_ios/rdbuf.md)`()`に対する操作は、一切行わない。


## バージョン
### 言語
- C++98


## 関連項目
- [`basic_iostream`](../basic_iostream.md)`::`[`basic_iostream`](op_constructor.md)
- [`basic_istream`](../basic_istream.md)`::`[`~basic_istream`](../basic_istream/op_destructor.md)
- [`basic_ostream`](../../ostream/basic_ostream.md)`::`[`~basic_ostream`](../../ostream/basic_ostream/op_destructor.md)
