# 確率が高い分岐と低い分岐を伝える属性 [[likely]], [[unlikely]] [P0479R5]
* cpp20[meta cpp]

## 概要
if文やswitch文といった分岐制御構文において、条件分岐先のうちどれが実行される可能性が高いかという情報を、C++コンパイラへ最適化ヒントとして与える属性である。
これらの属性を適切に用いると、C++コンパイラはより高速に動作するプログラムを生成する可能性がある。

`[[likely]]`, `[[unlikely]]`属性はあくまでヒント情報にすぎないため、C++コンパイラはこれらを完全に無視するかもしれない。
また実際にどの程度の効果がえられるかは、C++コンパイラの最適化性能、動作環境のCPUアーキテクチャなどに依存する。


## 仕様
`[[likely]]`, `[[unlikely]]`属性は、ラベル または 文 に対して指定できる。
ある要素に対して`[[likely]]`と`[[unlikely]]`を同時指定してはならない。


## 例
```cpp
bool process()
{
  if (!do_preprocess()) [[unlikely]] {
    // （めったに失敗しないが）サブ処理に失敗したらfalseを返す
    return false;
  }

  // 何らかのメイン処理

  if (!do_postprocess()) [[unlikely]] {
    // （めったに失敗しないが）サブ処理に失敗したらfalseを返す
    return false;
  }

  // 正常終了はtrueを返す
  return true;
}
```
* unlikely[color ff0000]

```cpp
std::string fizzbuzz(int n)
{
  using namespace std::string_literals;
  switch (n % 15) {
  case 3: case 6: case 9: case 12:
    return "Fizz"s;
  case 5: case 10:
    return "Buzz"s;
  case 0:
    return "FizzBuzz"s;
  [[likely]] default:
    return std::format("{}", n);
  }
}
// 上記例のlikely属性利用は適切ではない可能性もあり、
// switch文ラベルへ属性指定構文例示として解釈すること。
// 入力nがランダムと仮定すると 8/15=53.3% の分岐確率となり、
// この程度の偏りに対して最適化効果が得られるかは未知数である。
```
* likely[color ff0000]


## この機能が必要になった背景・経緯
GCCやClangなど一部C++コンパイラでは独自拡張として同等機能を提供しており、Linuxカーネルや大規模OSSによる広い利用実績があったため、C++標準の属性として採用された。


## 関連項目
- [C++23 `[[assume]]`属性](/lang/cpp23/portable_assumptions.md)


## 参照
- [How do the likely/unlikely macros in the Linux kernel work and what is their benefit? - Stack Overflow](https://stackoverflow.com/questions/109710/)
- [GCC __builtin_expect組み込み関数](https://gcc.gnu.org/onlinedocs/gcc/extensions-to-the-c-language-family/other-built-in-functions-provided-by-gcc.html)
- [Clang __builtin_expect組み込み関数](https://llvm.org/docs/BranchWeightMetadata.html)
- [P0479R2 Attributes for Likely and Unlikely Statements (Revision 2)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2017/p0479r2.html)
- [P0479R5 Proposed wording for likely and unlikely attributes (Revision 5)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2018/p0479r5.html)
