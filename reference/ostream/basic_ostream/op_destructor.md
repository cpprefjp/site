#デストラクタ
* ios[meta header]
* std[meta namespace]
* basic_ostream[meta class]
* function[meta id-type]

```cpp
virtual ~basic_ostream();
```
* basic_ostream[link ../basic_ostream.md]


##概要
出力ストリームオブジェクトを破棄する。


##備考
[`rdbuf`](../../ios/basic_ios/rdbuf.md)`()` に対する操作は、一切行わない。


##バージョン
###言語
- C++11


###処理系
- [Clang](/implementation.md#clang): 3.0, 3.1, 3.2, 3.3, 3.4, 3.5.0, 3.6.0, 3.7.0, 3.8.0
- [GCC](/implementation.md#gcc): 4.3.6, 4.4.7, 4.5.4, 4.6.4, 4.7.3, 4.8.1, 4.8.2, 4.9.0, 4.9.1, 4.9.2, 5.1.0, 5.2.0, 6.0.0
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


##参照
- [`basic_ostream`](../basic_ostream.md)`::`[`basic_ostream`](op_constructor.md.nolink)
- [`basic_ostream`](../basic_ostream.md)`::`[`swap`](swap.md)
- [`basic_ostream`](../basic_ostream.md)`::`[`operator=`](op_assign.md)
- [`basic_ios`](../../ios/basic_ios.md)`::`[`basic_ios`](../../ios/basic_ios/op_constructor.md)
- [`basic_ios`](../../ios/basic_ios.md)`::`[`operator=`](../../ios/basic_ios/op_assign.md)
- [`basic_ios`](../../ios/basic_ios.md)`::`[`move`](../../ios/basic_ios/move.md)
- [`basic_ios`](../../ios/basic_ios.md)`::`[`swap`](../../ios/basic_ios/swap.md)
- [`ios_base`](../../ios/ios_base.md)`::`[`ios_base`](../../ios/ios_base/op_constructor.md)
- [`ios_base`](../../ios/ios_base.md)`::`[`operator=`](../../ios/ios_base/op_assign.md)
