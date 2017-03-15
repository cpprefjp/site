# デストラクタ
* ios[meta header]
* function[meta id-type]
* std[meta namespace]
* ios_base::Init[meta class]

```cpp
~Init();
```

## 概要
自分が最後のオブジェクトだった場合、標準入出力ストリームオブジェクトをフラッシュする。


## 効果
`Init` クラスのオブジェクトを破棄する。  
`Init` クラスのインスタンスが他に無かった場合、[`cout`](../../../iostream/cout.md)`.`[`flush`](../../../ostream/basic_ostream/flush.md)`()`、[`cerr`](../../../iostream/cerr.md)`.`[`flush`](../../../ostream/basic_ostream/flush.md)`()`、[`clog`](../../../iostream/clog.md)`.`[`flush`](../../../ostream/basic_ostream/flush.md)`()`、[`wcout`](../../../iostream/wcout.md.nolink)`.`[`flush`](../../../ostream/basic_ostream/flush.md)`()`、[`wcerr`](../../../iostream/wcerr.md.nolink)`.`[`flush`](../../../ostream/basic_ostream/flush.md)`()`、[`wclog`](../../../iostream/wclog.md.nolink)`.`[`flush`](../../../ostream/basic_ostream/flush.md)`()` を呼び出す。


## バージョン
## 言語
- C++98

### 処理系
- [Clang](/implementation.md#clang): 3.0, 3.1, 3.2, 3.3, 3.4, 3.5.0, 3.6.0, 3.7.0, 3.8.0
- [GCC](/implementation.md#gcc): 4.3.6, 4.4.7, 4.5.4, 4.6.4, 4.7.3, 4.8.1, 4.8.2, 4.9.0, 4.9.1, 4.9.2, 5.1.0, 5.2.0, 6.0.0
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 参照
- [`Init`](op_constructor.md)
- [`cout`](../../../iostream/cout.md)
- [`cerr`](../../../iostream/cerr.md)
- [`clog`](../../../iostream/clog.md)
- [`wcout`](../../../iostream/wcout.md.nolink)
- [`wcerr`](../../../iostream/wcerr.md.nolink)
- [`wclog`](../../../iostream/wclog.md.nolink)
- [`basic_ostream`](../../../ostream/basic_ostream.md)`::`[`flush`](../../../ostream/basic_ostream/flush.md)
