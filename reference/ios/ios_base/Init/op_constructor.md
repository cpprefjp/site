# コンストラクタ
* ios[meta header]
* function[meta id-type]
* std[meta namespace]
* ios_base::Init[meta class]

```cpp
Init();
```

## 概要
標準入出力ストリームオブジェクトを構築・初期化する。


## 効果
`Init` クラスのオブジェクトを構築する。  
[`cin`](../../../iostream/cin.md)、[`cout`](../../../iostream/cout.md)、[`cerr`](../../../iostream/cerr.md)、[`clog`](../../../iostream/clog.md)、[`wcin`](../../../iostream/wcin.md.nolink)、[`wcout`](../../../iostream/wcout.md.nolink)、[`wcerr`](../../../iostream/wcerr.md.nolink)、[`wclog`](../../../iostream/wclog.md.nolink) の 8 つのオブジェクトが構築・初期化されていなければ、それらの構築・初期化を行う。


## バージョン
## 言語
- C++98

### 処理系
- [Clang](/implementation.md#clang): 3.0 [mark verified], 3.1 [mark verified], 3.2 [mark verified], 3.3 [mark verified], 3.4 [mark verified], 3.5.0 [mark verified], 3.6.0 [mark verified], 3.7.0 [mark verified], 3.8.0 [mark verified]
- [GCC](/implementation.md#gcc): 4.3.6 [mark verified], 4.4.7 [mark verified], 4.5.4 [mark verified], 4.6.4 [mark verified], 4.7.3 [mark verified], 4.8.1 [mark verified], 4.8.2 [mark verified], 4.9.0 [mark verified], 4.9.1 [mark verified], 4.9.2 [mark verified], 5.1.0 [mark verified], 5.2.0 [mark verified], 6.0.0 [mark verified]
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 参照
- [`~Init`](op_destructor.md)
- [`cin`](../../../iostream/cin.md)
- [`cout`](../../../iostream/cout.md)
- [`cerr`](../../../iostream/cerr.md)
- [`clog`](../../../iostream/clog.md)
- [`wcin`](../../../iostream/wcin.md.nolink)
- [`wcout`](../../../iostream/wcout.md.nolink)
- [`wcerr`](../../../iostream/wcerr.md.nolink)
- [`wclog`](../../../iostream/wclog.md.nolink)
