# デストラクタ
* ios[meta header]
* function[meta id-type]
* std[meta namespace]
* ios_base[meta class]

```cpp
virtual ~ios_base();
```

## 概要
オブジェクトを破棄する。


## 効果
オブジェクトを破棄する。  
また、[`register_callback`](register_callback.md) で登録されたペア `(fn, index)` を `(*fn)(`[`erase_event`](type-event.md)`, *this, index)` として呼び出す。  
コールバック関数が呼び出されている間、[`ios_base`](../ios_base.md) のあらゆるメンバ関数呼び出しが有効に機能することが保証されている。


## バージョン
## 言語
- C++98

### 処理系
- [Clang](/implementation.md#clang): 3.0 [mark verified], 3.1 [mark verified], 3.2 [mark verified], 3.3 [mark verified], 3.4 [mark verified], 3.5.0 [mark verified], 3.6.0 [mark verified], 3.7.0 [mark verified], 3.8.0 [mark verified]
- [GCC](/implementation.md#gcc): 4.3.6 [mark verified], 4.4.7 [mark verified], 4.5.4 [mark verified], 4.6.4 [mark verified], 4.7.3 [mark verified], 4.8.1 [mark verified], 4.8.2 [mark verified], 4.9.0 [mark verified], 4.9.1 [mark verified], 4.9.2 [mark verified], 5.1.0 [mark verified], 5.2.0 [mark verified], 6.0.0 [mark verified]
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 参照
- [`ios_base`](../ios_base.md)`::`[`ios_base`](op_constructor.md)
- [`basic_ios`](../basic_ios.md)
- [`basic_ios`](../basic_ios.md)`::`[`~basic_ios`](../basic_ios/op_destructor.md)
