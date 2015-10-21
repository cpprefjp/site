#コンストラクタ
* ios[meta header]
* std[meta namespace]
* basic_ostream[meta class]
* function[meta id-type]

```cpp
public:
  explicit basic_ostream(basic_streambuf<char_type, traits_type>* sb);  // (1)

protected:
  basic_ostream(const basic_ostream& rhs) = delete;                     // (2) C++11 から

  basic_ostream(basic_ostream&& rhs);                                   // (3) C++11 から
```
* basic_ostream[link ../basic_ostream.md]
* basic_streambuf[link ../../streambuf/basic_streambuf.md]


##概要
出力ストリームオブジェクトを構築する。


##効果
- (1) 出力ストリームオブジェクトを構築した後、[`basic_ios`](../../ios/basic_ios.md)`<char_type, traits_type>::`[`init`](../../ios/basic_ios/init.md)`(sb)` を呼び出して初期化する。
- (2) コピーコンストラクタ。コピー構築不可。  
    [`basic_ostream`](../basic_ostream.md) オブジェクトをコピー構築することはできない。
- (3) ムーブコンストラクタ。  
    [`basic_ios`](../../ios/basic_ios.md)`<char_type, traits_type>::`[`swap`](../../ios/basic_ios/swap.md)`(rhs)` を呼び出す。


##備考
- コピーコンストラクタは C++03 までは未宣言だったため、コピー代入を行おうとするとコンパイラがコピーコンストラクタを自動生成しようとするが、基底クラスのコピーコンストラクタ [`basic_ios`](../../ios/basic_ios.md)`::`[`basic_ios`](../../ios/basic_ios/op_constructor.md)`()` が `private` であるため、エラーとなっていた。  
    （いずれにせよコピーすることはできないが、`delete` の方が誤ってコピーしようとした際のエラーメッセージが分かりやすいため、変更されている）


##バージョン
###言語
- C++98


###処理系
- [Clang](/implementation.md#clang): 3.0, 3.1, 3.2, 3.3, 3.4, 3.5.0, 3.6.0, 3.7.0, 3.8.0
- [GCC](/implementation.md#gcc): 4.3.6, 4.4.7, 4.5.4, 4.6.4, 4.7.3, 4.8.1, 4.8.2, 4.9.0, 4.9.1, 4.9.2, 5.1.0, 5.2.0, 6.0.0
- [GCC, C++11 mode](/implementation.md#gcc): 5.1.0, 5.2.0, 6.0.0
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


##参照
- [`basic_ostream`](../basic_ostream.md)`::`[`~basic_ostream`](op_destructor.md)
- [`basic_ostream`](../basic_ostream.md)`::`[`operator=`](op_assign.md)
- [`basic_ostream`](../basic_ostream.md)`::`[`swap`](swap.md)
- [`basic_ios`](../../ios/basic_ios.md)`::`[`basic_ios`](../../ios/basic_ios/op_constructor.md)
- [`basic_ios`](../../ios/basic_ios.md)`::`[`operator=`](../../ios/basic_ios/op_assign.md)
- [`basic_ios`](../../ios/basic_ios.md)`::`[`move`](../../ios/basic_ios/move.md)
- [`basic_ios`](../../ios/basic_ios.md)`::`[`swap`](../../ios/basic_ios/swap.md)
- [`ios_base`](../../ios/ios_base.md)`::`[`ios_base`](../../ios/ios_base/op_constructor.md)
- [`ios_base`](../../ios/ios_base.md)`::`[`operator=`](../../ios/ios_base/op_assign.md)
