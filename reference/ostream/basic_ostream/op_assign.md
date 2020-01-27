# operator=
* ostream[meta header]
* std[meta namespace]
* basic_ostream[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
protected:
  basic_ostream& operator=(const basic_ostream& rhs) = delete;      // (1)

  basic_ostream& operator=(basic_ostream&& rhs);                    // (2)
```
* basic_ostream[link ../basic_ostream.md]


## 概要
ストリームオブジェクトを代入する。


## 効果
- (1) コピー代入演算�。コピー代入不可。  
    [`basic_ostream`](../basic_ostream.md) オブジェクトをコピー代入することはできない。
- (2) ムーブ代入演算�。  
    [`basic_ios`](../../ios/basic_ios.md)`<char_type, traits_type>::`[`swap`](../../ios/basic_ios/swap.md)`(rhs)` を呼び出す。


## 戻り値
無し


## 備考
- [`rdbuf`](../../ios/basic_ios/rdbuf.md)`()` は交換されない。
- コピー代入演算�は C++03 までは未宣言だったため、コピー代入を行おうとするとコンパイラがコピー代入演算�を自動生成しようとするが、基底クラスのコピー代入演算� [`basic_ios`](../../ios/basic_ios.md)`::`[`operator=`](../../ios/basic_ios/op_assign.md)`()` が `private` であるため、エラーとなっていた。  
    （いずれにせよコピーすることはできないが、`delete` の方が誤ってコピーしようとした際のエラーメッセージが分かりやすいため、変更されている）


## バージョン
### 言語
- C++11


### 処理系
- [Clang](/implementation.md#clang): 3.0, 3.1, 3.2, 3.3, 3.4, 3.5.0, 3.6.0, 3.7.0, 3.8.0
- [GCC](/implementation.md#gcc): 5.1.0, 5.2.0, 6.0.0
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 参照
- [`basic_ostream`](../basic_ostream.md)`::`[`basic_ostream`](op_constructor.md)
- [`basic_ios`](../../ios/basic_ios.md)`::`[`basic_ios`](../../ios/basic_ios/op_constructor.md)
- [`basic_ios`](../../ios/basic_ios.md)`::`[`operator=`](../../ios/basic_ios/op_assign.md)
- [`basic_ios`](../../ios/basic_ios.md)`::`[`move`](../../ios/basic_ios/move.md)
- [`basic_ios`](../../ios/basic_ios.md)`::`[`swap`](../../ios/basic_ios/swap.md)
- [`ios_base`](../../ios/ios_base.md)`::`[`ios_base`](../../ios/ios_base/op_constructor.md)
- [`ios_base`](../../ios/ios_base.md)`::`[`operator=`](../../ios/ios_base/op_assign.md)
