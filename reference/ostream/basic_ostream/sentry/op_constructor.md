# コンストラクタ
* ostream[meta header]
* std[meta namespace]
* basic_ostream::sentry[meta class]
* function[meta id-type]

```cpp
explicit sentry(basic_ostream& os);
```

## 概要
出力処理の前処理を行う。

## 効果
もし `os.`[`good`](../../../ios/basic_ios/good.md)`()` が `true` なら、書式化出力・非書式化出力の準備処理を行い、`os.`[`tie`](../../../ios/basic_ios/tie.md)`()` が非ヌルポインタなら、`os.`[`tie`](../../../ios/basic_ios/tie.md)`()->`[`flush`](../flush.md)`()` を呼び出す。

全ての準備処理が完了したら、このオブジェクトの [`operator bool`](op_bool.md)`()` 関数は `true` を、さもなくば `false` を返すようになる。

準備処理を行っている間に、`os.`[`setstate`](../../../ios/basic_ios/setstate.md)`(failbit)` が呼び出される可能性がある。（これは、[`ios_base`](../../../ios/ios_base.md)`::failure` 例外の送出を引き起こす可能性がある）

## 備考
- 本コンストラクタでは、効果に記載されている以外に実装依存の処理が行われるかもしれない。
- `os.`[`tie`](../../../ios/basic_ios/tie.md)`()->`[`flush`](../flush.md)`()` は、同期が不要と判断できる場合には呼び出されないかもしれない。


## 参照
- [`operator bool`](op_bool.md)
- [`(destructor)`](op_destructor.md)
